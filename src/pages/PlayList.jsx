import React from 'react'
import Player from '../components/Player'
import Card from "../components/Card"
import { useSelector } from 'react-redux'
function PlayList() {

  let songs = useSelector(state => state)
  console.log(songs);
  return (
    <div className=' w-[100%] h-[100vh] bg-gradient-to-t from-blue-900 to-black flex justify-start items-center flex-col pt-[20px] md:pt-[100px] gap-[30px]'>
      <Player/>

      {!songs.length < 1 ? <><h1 className='text-white font-semibold text-[20px]'>Playlist</h1>
        <div className='w-full h-[65%] md:h-[100%] flex flex-col justify-start items-center gap-[20px] overflow-auto'>
          {songs.map((song) => (
            <Card name={song.name} image={song.image} singer={song.singer} songIndex={song.songIndex} />
          ))}
        </div></>
        :
        <div className='text-gray-700 text-[30px] font-semibold'>No Songs In playlist</div>
      }
    </div>
  )
}

export default PlayList