'use client'

import Image from 'next/image'
import axios from "axios";
import useSWR from "swr";
import {useState} from "react";
import {nanoid} from "nanoid";

const fetcher = url => axios.get(url).then(res => res.data)

const Card = (task) => {
  return (
      <div className='rounded-lg p-4 border border-solid border-gray-700 w-96'>
        <p className='text-sm'>{task.id}</p>
        <p className="mt-3 text-base font-bold">{task.name}</p>
        <div className='flex flex-col'>
          <p className='text-green-500'>Status: {task.status}</p>
          <p className='text-red-500'>Deadline: {task.deadline}</p>
        </div>
      </div>
  )
}

export default function Home() {
  const [shouldFetch, setShouldFetch] = useState(false)
  const { data, isLoading, mutate  } = useSWR(shouldFetch  ? 'https://2inakh1l4i.execute-api.ap-southeast-1.amazonaws.com/v1/task' : null, fetcher)

  const addTask = async () => {
    try {
      await axios.post('https://2inakh1l4i.execute-api.ap-southeast-1.amazonaws.com/v1/task', {
        "id": nanoid(10),
        "name": `Task ${nanoid(10)}`,
        "status": "To do",
        "deadline": "2023-14-05T14:48:00.000Z"
      })
      await mutate()
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">

          <code className="font-mono font-bold">app/page.js</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative flex flex-col gap-10 place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <div className="flex gap-3 mt-6 z-10"><button className='w-40 h-10 bg-blue-700 rounded-2xl cursor-pointer hover:bg-blue-800' onClick={() => setShouldFetch(true)}>
          GET ALL TASKS
        </button>
          <button className='w-40 h-10 bg-blue-700 rounded-2xl cursor-pointer hover:bg-blue-800' onClick={addTask}>
            ADD A TASKS
          </button></div>
        {
          isLoading ? <p className='text-white'>Fetching task...</p> : (
              <div className='flex gap-6 flex-wrap items-center justify-center'>
                {
                  data?.Items.map(item => <Card key={item.id} {...item} />)
                }
              </div>
          )
        }
      </div>
      Test CICD
    </main>
  )
}
