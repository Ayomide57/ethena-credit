"use client";
import { useEffect, useState, useCallback } from "react";
//import Link from "next/link";
import Image from "next/image";
import { useActiveAccount } from "thirdweb/react";

 export interface IUserData {
   company: `0x${string}`;
   name: string;
   owner_name: string;
   location: string;
   phone_number: bigint;
   existed: boolean;
 }

const Profile = () => {

  //const [userData, setUserData] = useState<IUserData | unknown>(null);
  const smartAccount = useActiveAccount();


  /**const UpdateUI = useCallback(async () => {
    if (smartAccount) {
      //const response = getCompany({ borrower: account });
      //setUserData(await response);
    }
  }, [smartAccount]);**/

  useEffect(() => {
    //UpdateUI();
    //}, [UpdateUI, userData]);
  },[]);
    return (
      <>
        <div className="w-full px-4 ml-10">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-xl rounded-lg mt-16 backdrop-blur-xl bg-sky-700/10">
            {/**userData != null && smartAccount?.address && (**/
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full px-4 text-center mt-20">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          22
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Requests
                        </span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          10
                        </span>
                        <span className="text-sm text-blueGray-400">Loans</span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          89
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Collateral
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        An artist of considerable range, Jenna the name taken by
                        Melbourne-raised, Brooklyn-based Nick Murphy writes,
                        performs and records all of his own music, giving it a
                        warm, intimate feel with a solid groove structure. An
                        artist of considerable range.
                      </p>
                      <a
                        href="javascript:void(0);"
                        className="font-normal text-pink-500"
                      >
                        Show more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              //)}
            }
          </div>
        </div>
      </>
    );
};

export default Profile;
