import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';

import { Link } from 'react-router-dom';

function Paste() {

  const [searchTerm, setSearchTerm] = useState('')
  const pastes = useSelector((state) => state.paste.pastes)

  const dispatch = useDispatch();

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()))
  return (
    <div>
      <input
        type="search"
        placeholder='search paste'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='p-2 rounded-2xl min-w-[600px] mt-5 bg-[#212121] text-white'
      />
      <div className="flex flex-col gap-5 mt-3">
        {
          filteredData.length > 0 && filteredData.map((paste) => {
            return (
              <div key={paste._id} className='border'>
                <div>
                  {paste.title}
                </div>
                <div>
                  {paste.content}
                </div>
                <div className='flex flex-row gap-4 place-content-evenly mt-2 '>
                  <button className='p-1 mb-2 bg-[#111111] rounded-md w-20'>
                   <Link to={`/?pasteId=${paste._id}`}> EDIT</Link>
                  </button>
                  <button className='p-1 mb-2 bg-[#111111] rounded-md w-20'>
                    <Link to={`/pastes/${paste._id}`}>View</Link>
                  </button>
                  <button className='p-1 mb-2 bg-[#111111] rounded-md w-20'
                    onClick={() => handleDelete(paste._id)}>Delete</button>
                  

                </div>
                <div>
                  {paste.createdAt}
                </div>
              </div>

            )
          })
        }

      </div>
    </div>
  )
}

export default Paste