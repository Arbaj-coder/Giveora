"use client";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/component/Navbar";
import { getCompletedUsers } from "@/actions/useractions"; // 👈 import this

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  useEffect(() => {
    (async () => {
      const result = await getCompletedUsers();
      setUsers(result);
      setFilteredUsers(result);
    })();
  }, []);

  const handleSearch = (e) => {
    const q = e.target.value.toLowerCase();
    setSearchQuery(q);
    const filtered = users.filter(u =>
      u.name?.toLowerCase().includes(q) || u.username?.toLowerCase().includes(q)
    );
    setFilteredUsers(filtered);
  };

  if (status === "loading") return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent"></div>
    </div>
  );
  return (
    <div>
      <Navbar/>
      <div className="flex justify-center flex-col gap-4 items-center text-white h-[44vh] px-5 md:px-0 text-xs md:text-base  ">
        <div className="font-bold flex gap-6 md:gap-20 md:text-5xl justify-center items-center text-3xl">Giveora<span><img className="invertImg" src="/donation.png" width={88} alt="" /></span></div>
        <p className="text-center md:text-left">
           A place where kindness meets technology. 
          
        </p>
        <p className="text-center md:text-left">

        Support causes, empower individuals, and make a real difference through transparent, secure donations
        </p>
        <div>
          <Link href={"/dashboard"}>

          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button>
          </Link>

          <Link href="/about">
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
          </Link>

        </div>
      </div>
      <div className="bg-white h-1 opacity-10">
      </div>
        
<div className="px-4 py-10 text-white">
        <h1 className="text-3xl font-bold mb-8 text-center">
  🌟 Meet the Heroes You Can Empower 🌟
</h1>


        <div className="mb-6 flex items-center gap-3 bg-slate-900 rounded-md px-3 py-2 max-w-md">
          <FaSearch />
          <input
            onChange={handleSearch}
            value={searchQuery}
            className="bg-transparent outline-none flex-grow"
            type="text"
            placeholder="Search users"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <Link key={user._id} href={`/name/${user.username}`}>
              <div className="bg-slate-800 p-4 rounded-lg shadow hover:shadow-md transition duration-300">
                <div className="flex items-center gap-4">
                  <img
                    src={user.profilepic}
                    alt={user.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold">@{user.username}</p>
                    <p className="text-sm text-slate-400">{user.name}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <p className="text-slate-400 mt-6">No users found.</p>
        )}
      </div>

      <div className="bg-white h-1 opacity-10">
      </div>

      <div className="text-white container mx-auto pb-32 pt-14 px-10">
  <h2 className="text-3xl font-bold text-center mb-14">Your Fans can get a Giveora</h2>
  <div className="flex gap-5 justify-around">
    <div className="item space-y-3 flex flex-col items-center justify-center">
      <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/man.gif" alt="" />
      <p className="font-bold text-center">Fans want to help</p>
      <p className="text-center">Your fans are available to support you</p>
    </div>
    <div className="item space-y-3 flex flex-col items-center justify-center">
      <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/coin.gif" alt="" />
      <p className="font-bold text-center">Fans want to contribute</p>
      <p className="text-center">Your fans are willing to contribute financially</p>
    </div>
    <div className="item space-y-3 flex flex-col items-center justify-center">
      <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/group.gif" alt="" />
      <p className="font-bold text-center">Fans want to collaborate</p>
      <p className="text-center">Your fans are ready to collaborate with you</p>
    </div>
  </div>
</div>
      <div className="bg-white h-1 opacity-10">
      </div>

      <div className="text-white container mx-auto pb-32 pt-14 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center mb-14">Learn more about us</h2>
        {/* Responsive youtube embed  */}
        {/* <div className="w-[90%] h-[40vh] md:w-[50%] md:h-[40vh] lg:w-[50%] lg:h-[40vh] xl:w-[50%] xl:h-[40vh]">
          <iframe className="w-full h-full" src="https://www.youtube.com/embed/ojuUnfqnUI0?si=wMUv4DG3ia6Wt4zn" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

          </div> */}
      
      </div>
      
    </div>
  );
};

export default Page;