import  { useEffect, useState } from 'react'
import { useDispatch , useSelector} from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPaste, updateToPastes } from '../redux/pasteSlice';

function Home() {

    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId"); // to search pasteID
    const dispatch=useDispatch();
    const allPastes=useSelector((state)=>state.paste.pastes)


    function createPaste() {
           // function use to create a paste and forward the data to slice reducer
           const paste={
            title:title,
            content:value,
            _id:pasteId || Date.now().toString(36),
            createdAt:new Date().toISOString().split("T")[0],
           }
           if(pasteId){
            //update
              dispatch(updateToPastes(paste));
           }
           else{
            //create
            dispatch(addToPaste(paste));
            //  dispatch the paste as action.payload
           }
           setTitle("");
           setValue("");
           setSearchParams({});
    }

   useEffect(()=>{
         if(pasteId){
            const paste=allPastes.find((p)=>p._id === pasteId);
            console.log(paste)
            setTitle(paste.title)
            setValue(paste.content);
         }
   },[pasteId])
    return (
        <div>
            <div className='flex flex-row gap-7 place-content-between overflow-hidden flex-wrap'>
                <input
                    type="text"
                    placeholder='enter title here'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='p-1 rounded-md bg-[#212121] border mt-4 text-white w-[66%] pl-2'

                />
                <button className='p-2 rounded-md bg-[#212121] text-white mt-4 border'
                    onClick={createPaste } >{
                        pasteId ? "Update my Paste" : "Create my Paste"
                    }</button>



            </div>
            <div className='mt-8'>
                <textarea
                    value={value}
                    placeholder='enter the content'
                    className='bg-[#212121] p-2 min-w-[500px] rounded-lg pl-2'
                    onChange={(e) => setValue(e.target.value)}
                    rows={20}
                />
            </div>
        </div>

    )
}

export default Home

// if we have paste id then its a updation other wise creation of paste
// we will use conditional redering iin the button as we have same ui for to create a paste and update a paste
