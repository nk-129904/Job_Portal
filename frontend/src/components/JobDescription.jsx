import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "../../redux/jobSlice";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import API from "../../utils/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Loader2 } from "lucide-react";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  const [openAPI, setOpenAPI] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      if (coverLetter) formData.append("coverLetter", coverLetter);
      if (resumeFile) formData.append("file", resumeFile);

      const res = await API.post(`/application/apply/${jobId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        setIsApplied(true);
        setOpenAPI(false);

        const updatedSingleJob = {
          ...singleJob,
          applications: [
            ...singleJob.applications,
            { applicant: user?._id },
          ],
        };

        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Error applying job");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await API.get(`/job/get/${jobId}`);

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));

          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-5xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>

          <div>
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {singleJob?.position} Positions
            </Badge>
            <Badge className="text-red-600 font-bold" variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-indigo-600 font-bold" variant="ghost">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>

        <Button
          onClick={() => (isApplied ? null : setOpenAPI(true))}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
        Job Description
      </h1>

      <div>
        <h1 className="font-bold my-1">
          Role:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.title}
          </span>
        </h1>

        <h1 className="font-bold my-1">
          Location:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.location}
          </span>
        </h1>

        <h1 className="font-bold my-1">
          Description:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.description}
          </span>
        </h1>

        <h1 className="font-bold my-1">
          Experience:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.experience} yrs
          </span>
        </h1>

        <h1 className="font-bold my-1">
          Salary:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.salary} LPA
          </span>
        </h1>

        <h1 className="font-bold my-1">
          Total Applicants:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.applications?.length}
          </span>
        </h1>

        <h1 className="font-bold my-1">
          Posted Date:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.createdAt?.split("T")[0]}
          </span>
        </h1>
      </div>

      {/* Application Dialog */}
      <Dialog open={openAPI} onOpenChange={setOpenAPI}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Submit Application</DialogTitle>
          </DialogHeader>
          <form onSubmit={applyJobSubmitHandler} className="space-y-6 mt-4">
            <div className="space-y-2">
              <Label htmlFor="resume">Resume (PDF/Doc) Optional</Label>
              <Input
                id="resume"
                type="file"
                accept="application/pdf,.doc,.docx"
                onChange={(e) => setResumeFile(e.target.files?.[0])}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="coverLetter">Cover Letter & Details Optional</Label>
              <textarea
                id="coverLetter"
                rows={4}
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Briefly explain why you are a good fit for this role..."
                className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {loading ? (
              <Button disabled className="w-full bg-indigo-600 text-white">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting Application...
              </Button>
            ) : (
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                Submit Application
              </Button>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobDescription;