'use client';

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation';
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useFirebase } from '@/hooks/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import MenuItem from '@/dtos/menu-item';
import SvgRenderer from './SvgRender';
import { useAuth } from '@/context/auth';
import Image from 'next/image';

// const teams = [
//   { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
//   { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
//   { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
// ]

// const navigation = [
//   { name: 'Develop Patient', href: '/module/develop-patient', icon: UserIcon},
//   { name: 'Develop Doctor', href: '/module/develop-doctor', icon: HomeModernIcon },
//   { name: 'Homolog Patient', href: '/module/interconsulta-patient', icon: UserIcon },
//   { name: 'Homolog Doctor', href: '/module/interconsulta-doctor', icon: HomeModernIcon },
// ];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Menu(props: React.PropsWithChildren) {
  const pathName = usePathname();
  const { user } = useAuth();
  const { db } = useFirebase();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const renderItemRef = (id: string) => {
    return `/module/${id}`
  }

  function getUsernameFromEmail(email: string): string {
    // Dividir a string usando "@" e capturar a primeira parte (nome de usuário)
    const username = email.split("@")[0];
    
    // Transformar a primeira letra em maiúscula e concatenar com o restante
    return username.charAt(0).toUpperCase() + username.slice(1);
  }

  useEffect(() => {
    const menuCollectionRef = collection(db, "menu");
    const unsubscribe = onSnapshot(menuCollectionRef,
      (snapshot) => {
        const items = snapshot.docs.map(doc => MenuItem.create({ id: doc.id, ...doc.data() }))
        setMenuItems(items);
    });

    return () =>  unsubscribe()
  }, [db]);

  return (
    <div>
      <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                </button>
              </div>
            </TransitionChild>
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
              <div className="pt-5 flex h-16 shrink-0 items-center">
                <Image
                  alt="Your Company"
                  src={"/images/cover-white.png"}
                  width={300}
                  height={100}
                  className="w-full"
                />
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {menuItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={renderItemRef(item.id)}

                            className={classNames(
                              pathName === renderItemRef(item.id)
                                ? 'bg-gray-800 text-white'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                              'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                            )}
                          >
                            <SvgRenderer svgString={item.icon} aria-hidden="true" className="size-6 shrink-0" />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  {/* <li>
                    <div className="text-xs/6 font-semibold text-gray-400">Your teams</div>
                    <ul role="list" className="-mx-2 mt-2 space-y-1">
                      {teams.map((team) => (
                        <li key={team.name}>
                          <Link
                            href={team.href}
                            className={classNames(
                              team.current
                                ? 'bg-gray-800 text-white'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                              'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                            )}
                          >
                            <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                              {team.initial}
                            </span>
                            <span className="truncate">{team.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li> */}
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
          <div className="pt-5 flex h-16 shrink-0 items-center">
            <Image
              alt="Your Company"
              src={"/images/cover-white.png"}
              width={300}
              height={100}
              className="w-full"
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={renderItemRef(item.id)}
                        className={classNames(
                          pathName === renderItemRef(item.id)
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                          'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                        )}
                      >
                        {
                          item.icon ? (
                            <SvgRenderer svgString={item.icon} aria-hidden="true" className="size-6 shrink-0" />
                          ) : (
                            <ComputerDesktopIcon aria-hidden="true" className="size-6 shrink-0" />
                          )
                        }
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {/* <li>
                <div className="text-xs/6 font-semibold text-gray-400">Your teams</div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  {teams.map((team) => (
                    <li key={team.name}>
                      <Link
                        href={team.href}
                        className={classNames(
                          team.current
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                          'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                        )}
                      >
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                          {team.initial}
                        </span>
                        <span className="truncate">{team.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li> */}
              <li className="-mx-6 mt-auto">
                <Link
                  href="#"
                  className="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-white hover:bg-gray-800"
                >
                  {/* <Logo /> */}
                  <span className="sr-only">Your profile</span>
                  <span aria-hidden="true">{user?.displayName || getUsernameFromEmail(user?.email ?? "")}</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-xs sm:px-6 lg:hidden">
        <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-400 lg:hidden">
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon aria-hidden="true" className="size-6" />
        </button>
        
        <div className="flex-1 text-sm/6 font-semibold text-white">Dashboard</div>

        <Link href="#">
          <span className="sr-only">Your profile</span>
            {/* <Logo /> */}
        </Link>
      </div>

      <main className="py-10 lg:pl-72 w-full h-full">
        <div className="px-4 sm:px-6 lg:px-8">{props.children}</div>
      </main>
    </div>
  )
}
