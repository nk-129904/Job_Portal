import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'



const LatestJobCards = ({job}) => {
const navigate = useNavigate();
  return (
    <div onClick={()=>navigate(`/description/${job._id}`)} className='p-6 rounded-2xl shadow-sm hover:shadow-xl bg-white border border-gray-100 cursor-pointer transition-all duration-300 hover:-translate-y-1 group'>
      <div className='flex items-center gap-3 mb-2'>
        <div>
          <h1 className='font-semibold text-lg text-gray-900 group-hover:text-primary transition-colors'>{job?.company?.name}</h1>
          <p className='text-sm text-gray-500 font-medium'>India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-xl my-2 text-gray-900">{job?.title}</h1>
        <p className='text-sm text-gray-600 line-clamp-2 mt-1 leading-relaxed'>{job?.description}</p>
      </div>
      <div className='flex flex-wrap items-center gap-2 mt-5'>
        <Badge className={"bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold border-none"} variant="ghost">{job?.position} Positions</Badge>
        <Badge className={"bg-red-50 text-red-700 hover:bg-red-100 font-semibold border-none"} variant="ghost">{job?.jobType}</Badge>
        <Badge className={"bg-purple-50 text-purple-700 hover:bg-purple-100 font-semibold border-none"} variant="ghost">{job?.salary}LPA</Badge>
      </div>
    </div>
  )
}

export default LatestJobCards;
