import React, { useContext, useEffect, useRef, useState } from 'react'
import {songsData} from '../songs.js'
import musicImg from "../assets/musicanim.webp"
import { ImPrevious2 } from "react-icons/im";
import { FaPlay } from "react-icons/fa";
import { ImNext2 } from "react-icons/im";
import { dataContext } from '../context/UserContext.jsx';
import { FaPauseCircle } from "react-icons/fa";
import Card from '../components/Card.jsx';
import { MdKeyboardArrowDown } from "react-icons/md";
import Player from '../components/Player.jsx';



const Home = () => {
    let {audioRef,playingSong,playSong,pauseSong,nextSong,index,setIndex,prevSong} = useContext(dataContext)
    
    let [range,setRange] = useState(0)
    let progress = useRef(null)

    let[arrow,setArrow] = useState(false)

    useEffect(()=>{
        const updateProgress = () =>{
            let duration = audioRef.current.duration || 0
            let currentTime = audioRef.current. currentTime || 0
            let progressPrecentage = (currentTime/duration) * 100 || 0

            setRange(progressPrecentage)

            if(progress.current){
                progress.current.style.width = `${progressPrecentage}%`
            }
        }
        audioRef.current.addEventListener("timeupdate",updateProgress)
    })

    function handleRange(e) {

        let newrange = e.target.value
        setRange(newrange)

        let duration = audioRef.current.duration
        audioRef.current.currentTime = (duration * newrange) / 100

    }



  return (
    <div className='w-full h-screen bg-black flex relative overflow-hidden'>

        <MdKeyboardArrowDown className='absolute text-white top-[30px] left-[10%] text-[25px] md:hidden' onClick={()=> setArrow(prev => !prev)}/>


    
        {!arrow?<>
        <div className='w-full md:w-[50%] h-full flex justify-start items-center pt-[20px] md:pt-[120px] flex-col gap-[30px] bg-gradient-to-t from-blue-900 to-black' >
            <h1 className='text-white font-semibold text-[20px]'>Now Playing</h1>

            <div className='w-[80%] max-w-[250px] h-[300px] object-fill rounded-md overflow-hidden relative'>
                <img className='w-[100%] h-[100%]' src={songsData[index].image}  />

                {playingSong?
                <div className='w-full h-full bg-black absolute top-0 opacity-[0.5] flex justify-center items-center'>
                    <img src={musicImg} className='w-[50%]' />
                </div>:null}
                
            </div>

            <div>
                <div className='text-white text-[30px] font-semibold text-center'>{songsData[index].name}</div>
                <div className='text-white text-[30px] font-bold text-center'>{songsData[index].singer}</div>
            </div>


            <div className='w-[50%] flex justify-center items-center relative rounded-md'>
                <input type="range" className='appearance-none w-[100%] h-[8px] rounded-md bg-gray-600' id= 'range' value={range} onChange={handleRange}/>

                <div className={`bg-white h-[100%] absolute left-0 rounded-md`} ref ={progress}></div>
            </div>
                
            <div className='text-white flex justify-center items-center gap-5'>
                
                <ImPrevious2 className='w-[28px] h-[28px] hover:text-gray-600 transition-all cursor-pointer' onClick={() => prevSong()}/>

                {!playingSong?
                <div className='w-[50px] h-[50px] rounded-full bg-white text-black flex justify-center items-center hover:bg-gray-600 transition-all cursor-pointer' onClick={()=>playSong()}>
                    <FaPlay/>
                </div>:
                <div className='w-[50px] h-[50px] rounded-full bg-white text-black flex justify-center items-center hover:bg-gray-600 transition-all cursor-pointer'onClick={()=>pauseSong()}>
                    <FaPauseCircle />
                </div>
                }
                
                
                <ImNext2 className='w-[28px] h-[28px] hover:text-gray-600 transition-all cursor-pointer' onClick={()=> nextSong()}/>
            </div>
        </div>






        <div className='w-[100%] md:w-[50%] h-full  hidden md:flex flex-col gap-[15px] pt-[120px] overflow-auto pb-[20px] bg-gradient-to-t from-blue-900 to-black'>
            {songsData.map((song)=>(
                <Card name = {song.name} image = {song.image} singer={song.singer} songIndex={song.id - 1}/>
            ))}
        </div>
        </>:
        <div className='w-[100%] md:w-[50%] items-center flex flex-col gap-[15px] pt-[60px] overflow-auto pb-[70px] relative h-[70%]'>
            <Player/>
            {songsData.map((song)=>(
                <Card name = {song.name} image = {song.image} singer={song.singer} songIndex={song.id - 1}/>
            ))}
        </div>
        }
        

    </div>
  )
}

export default Home 