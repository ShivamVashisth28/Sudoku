import React, { useEffect, useRef, useState } from 'react'
import Board from '../components/Board';
import Loading from '../components/Loading';
import { useRecoilValue } from 'recoil';
import { solveAtom } from '../store/solveAtom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Game() {
    

    const [newBoard , setNewBoard] = useState([]);
    const [solution , setSolution] = useState([]);
    const [time, setTime] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [gamePause, setGamePause] = useState(false)
    const [difficulty , setDiffulty] = useState('');
    const [loading,setLoading] = useState(false)
    const isSolveTrue = useRecoilValue(solveAtom)


    
    const checkIsSolved = () => {
        if(isSolveTrue){
            toast.success("Hurray !!! ")
            setGamePause(!gamePause)
            
        }
        else{
            toast.warn("Not Correct !!")
        }
    }

    const intervalRef = useRef(null);
    const gamePauseRef = useRef(gamePause);

    useEffect(() => {
        gamePauseRef.current = gamePause;
    }, [gamePause]);


    useEffect(() => {
        setTime(0);
        setMinutes(0);      
        setHours(0);  
        startTime();
        return () => clearInterval(intervalRef.current); 
    }, [newBoard]);

    
    const startTime = () => {
        
        intervalRef.current = setInterval(() => {
            if (!gamePauseRef.current) {
                setTime(prevTime => {
                    if (prevTime === 59) {
                        setMinutes(prevMinutes => { 
                            if(prevMinutes == 59){
                                setHours(prevHours => prevHours + 1)
                                return 0;
                            }
                            return prevMinutes+1
                        });
                        return 0;
                    }
                    return prevTime + 1;
                });
            }
        }, 1000);
    };
   

    const fetchSudoku = async () => {
        setLoading(true);

        const response = await fetch('https://sudoku-api.vercel.app/api/dosuku')
        const data = await response.json()
        
        const value = data.newboard.grids[0].value
        const sol = data.newboard.grids[0].solution
        const difficulty = data.newboard.grids[0].difficulty

        setNewBoard(value)
        setSolution(sol)
        // console.log(sol)
        setDiffulty(difficulty)
        setLoading(false)
    }
    
    return (
        <div className='bg-slate-200 h-screen w-screen flex flex-col items-center font-fantasy'>
            
            <div className='text-2xl font-fantasy mt-5 p-2 font-bold'>SUDOKU</div>

            <div className='m-5'> 
                {loading && <Loading/>} 
                {(newBoard.length > 0) && (!loading) ? <>
                    <div className='flex justify-between'>
                        <div className='text-sm m-1'>Difficulty : {difficulty}</div>
                        <div className='text-sm m-1'>{hours > 0 ? hours + "hour : " : "" }  {minutes} mins : {time} secs </div>
                    </div>
                    {!gamePause ? <Board box={newBoard} solution={solution} /> : <div className="box-size border-2 border-slate-600 bg-slate-700 flex justify-center items-center text-white text-3xl">Click on play to resume</div>}
                </> : ""}
            </div>

            <div className='flex'>
                <div>
                    <button 
                        onClick={fetchSudoku} 
                        className=' bg-blue-300 border-2 border-black text-2xl m-2 p-2 
                                    hover:font-bold hover:bg-blue-400 hover:scale-110 rounded-lg'>
                        {newBoard.length > 0 ? "New Game" : 'Generate'}
                    </button>
                </div>
                {
                    newBoard.length > 0 && 
                    <>
                        <div>
                            <button 
                                onClick={checkIsSolved} 
                                className=' bg-blue-300 border-2 border-black text-2xl m-2 p-2 
                                            hover:font-bold hover:bg-blue-400 hover:scale-110 rounded-lg'>
                                Check
                            </button>
                        </div>
                        <div>
                            <button 
                                onClick={()=>setGamePause(!gamePause)} 
                                className=' bg-blue-300 border-2 border-black text-2xl m-2 p-2 
                                            hover:font-bold hover:bg-blue-400 hover:scale-110 rounded-lg'>
                                {!gamePause ? "Pause" : "Play"}
                            </button>
                        </div>
                    </>
                }
            </div>

            <ToastContainer theme='dark' autoClose={3000} />
        </div>
        
    )
}

export default Game
