import React, { useContext } from 'react'
import { songsData } from '../songs'
import { MdPlaylistAdd } from "react-icons/md";
import { GoHeartFill } from "react-icons/go";
import { dataContext } from '../context/UserContext';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlinePlaylistRemove } from 'react-icons/md'
import {AddSong} from "../redux/playlistSlice"

function Card({name,image,singer,songIndex}) {

    let {playSong,index,setIndex} = useContext(dataContext)

    let dispatch = useDispatch()
    let gaana = useSelector(state => state.playlist)
    let songExistInPlaylist = gaana.some((song)=> (song.songIndex === songIndex))

    


  return (
    <div className='w-[90%] h-[70px] md:h-[120px] bg-gray-800 rounded-lg p-[5px] md:p-[15px] flex justify-center items-center hover:bg-gray-600 transition-all'>

        {/* Left Card */}
        <div className='flex justify-start items-center gap-[20px] w-[80%] h-[100%] cursor-pointer' onClick={()=>{
            setIndex(songIndex)
            playSong()}}>
            <div>
                <img src={image} className='w-[60px] max-h-[60px] md:max-h-[100px] md:w-[100px] rounded-lg'/>
            </div>

            <div className='text-[15px] md:text-[20px]'>
                <div className='text-white text-[1em] font-semibold '>{name}</div>
                <div className='text-slate-400 text-[0.6em] font-semibold '>{singer}</div>
            </div>
        </div>

        {/* Right Card */}
        <div className='flex justify-center items-center gap-[20px] w-[20%] h-[100%] text-[15px] md:text-[20px]'>
            <div onClick={()=>{
                dispatch(AddSong({name:name,image:image,singer:singer,songIndex:songIndex}))
            }}>
                <MdPlaylistAdd className='text-white text-[1.2em] cursor-pointer'/>
            </div>
            <div >
                <GoHeartFill className='text-white text-[1em] cursor-pointer'/>
            </div>
        </div>

    </div>
  )
}

export default Card