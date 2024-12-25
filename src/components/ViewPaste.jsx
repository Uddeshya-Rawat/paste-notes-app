import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";





function ViewPaste() {
 const {id} = useParams();
    


  const allPastes=useSelector((state)=>state.paste.pastes) // get state (data)
  console.log(allPastes);

 
 const paste=allPastes.filter((p)=>p._id === id)[0];

 
  
  
 
  
 
  return (
    <div>
    <div className='flex flex-row gap-7 place-content-between overflow-hidden flex-wrap'>
        <input
            type="text"
            placeholder='enter title here'
            disabled
           value={paste.title}
            
            className='p-1 rounded-md bg-[#212121] border mt-4 text-white w-[66%] pl-2'

        />
       



    </div>
    <div className='mt-8'>
        <textarea
        value={paste.content}
           
            placeholder='enter the content'
            disabled
            className='bg-[#212121] p-2 min-w-[500px] rounded-lg pl-2'
            
            rows={20}
        />
    </div>
</div>

  )
}

export default ViewPaste