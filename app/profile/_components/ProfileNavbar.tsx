'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { useGetMe, useLogout } from '@/hooks/useAuth'
import { useGetMyNotifications, useMarkAllNotificationsAsRead, useMarkNotificationAsRead } from '@/hooks/useNotifications'
import { formatDistanceToNow } from 'date-fns'
import { Skeleton } from '@/components/ui/skeleton'
import { useSocket } from '@/hooks/useSocket'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

type Notification = {
  id: string
  type: 'SYSTEM' | 'WIN' | 'VOUCHER' | 'PROMO'
  title: string
  message: string
  isRead: boolean
  createdAt: string
}

const notifIconMap: Record<string, React.ReactNode> = {
  WIN: (
    <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
    </div>
  ),
  VOUCHER: (
    <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF5722" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M17 6V5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v1" /><line x1="12" y1="12" x2="12" y2="12.01" /></svg>
    </div>
  ),
  SYSTEM: (
    <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></svg>
    </div>
  ),
  PROMO: (
    <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center shrink-0">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 6v6l4 2" /></svg>
    </div>
  ),
}

const ProfileNavbar = () => {
  const pathname = usePathname()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const { data: profileData } = useGetMe();
  const { data: notificationsResponse, isLoading: isNotificationsLoading } = useGetMyNotifications();
  const { logout } = useLogout();
  const user = profileData?.user;

  const notifications = notificationsResponse?.data?.data || [];
  const meta = notificationsResponse?.data?.meta;
  const unreadCount = meta?.unreadCount || 0;

  const { mutate: markAllRead } = useMarkAllNotificationsAsRead();
  const { mutate: markRead } = useMarkNotificationAsRead();
  const socket = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (socket) {
      const handleNewNotification = (data: any) => {
        // Handle both direct object or nested data structure
        const notif = data.data || data;

        toast.success(notif.title || 'New Notification', {
          description: notif.message,
        });

        // Invalidate the notifications query to refresh the list and unread count
        queryClient.invalidateQueries({ queryKey: ["notifications", "my"] });
      };

      socket.on('notification', handleNewNotification);

      // Also listen for general message or event updates if needed
      socket.on('message', handleNewNotification);

      return () => {
        socket.off('notification', handleNewNotification);
        socket.off('message', handleNewNotification);
      };
    }
  }, [socket, queryClient]);

  const handleMarkAllRead = () => {
    markAllRead();
  }

  const handleNotifClick = (id: string) => {
    markRead(id);
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotificationOpen(false)
      }
    }
    if (isNotificationOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isNotificationOpen])

  const navLinks = [
    { name: 'Dashboard', href: '/profile/dashboard' },
    { name: 'My Vouchers', href: '/profile/my-vouchers' },
    { name: 'Winners', href: '/profile/winners' },
    { name: 'Profile', href: '/profile' },
    { name: 'Settings', href: '/profile/settings' },
  ]

  // const isSettingsActive = pathname.startsWith('/profile/settings')
  return (
    <nav className="bg-[#FDF8F1] py-4">
      <div className="mx-auto px-4 md:px-25 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative w-40 h-12">
          <Image
            src="/logo/logo.png"
            alt="WinAPizza!"
            fill
            className="object-contain"
          />
        </Link>

        <div className='flex gap-2 md:gap-4 items-center'>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:bg-white rounded-full border border-transparent hover:border-orange-100 transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>

          {/* Navigation Links */}

          <div className="hidden md:flex items-center  gap-4 ">
            <div className='bg-white py-3 px-3  rounded-full shadow-sm border border-orange-50'>
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-6 py-2 rounded-full text-sm font-semibold transition-all hover:bg-[#FF5722] hover:text-white  duration-300 ${isActive
                      ? 'bg-[#FF5722] text-white shadow-md'
                      : 'text-gray-500 hover:text-gray-900'
                      }`}
                  >
                    {link.name}
                  </Link>
                )
              })}
            </div>

            {/* <div className='bg-white py-2 rounded-full shadow-sm border border-orange-50'>
              <Link
                href="/profile/settings"
                className={`flex items-center gap-2 px-6 py-2 text-sm font-semibold hover:bg-[#FF5722] hover:text-white ml-2 rounded-full transition-all duration-300 ${isSettingsActive
                  ? 'bg-[#FF5722] text-white shadow-md'
                  : 'text-gray-500 hover:text-gray-900'
                  }`}

              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                Settings
              </Link>
            </div> */}
          </div>

          {/* User Actions */}
          <div className="flex items-end gap-4">
            {/* Notification Button + Dropdown */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => {
                  setIsNotificationOpen(prev => !prev)
                  setIsDropdownOpen(false)
                }}
                className="p-2 text-gray-400 hover:text-[#FF5722] bg-white rounded-full border border-gray-100 shadow-sm relative transition-colors duration-200"
                aria-label="Notifications"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
                {unreadCount > 0 && (
                  <motion.span
                    key={unreadCount}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-0.5 -right-0.5 min-w-4.5 h-4.5 px-1 bg-[#FF5722] text-white text-[10px] font-bold rounded-full border-2 border-white flex items-center justify-center leading-none"
                  >
                    {unreadCount}
                  </motion.span>
                )}
              </button>

              {/* Notification Dropdown */}
              <AnimatePresence>
                {isNotificationOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="fixed left-1/2 -translate-x-1/2 top-18 sm:absolute sm:left-auto sm:translate-x-0 sm:top-auto sm:right-0 sm:mt-3 w-[calc(100vw-32px)] max-w-85 sm:w-85 bg-white rounded-2xl shadow-2xl border border-gray-100 z-60 overflow-hidden"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
                      <div className="flex items-center gap-2">
                        <span className="text-[15px] font-bold text-[#1C274C]">Notifications</span>
                        {unreadCount > 0 && (
                          <span className="px-2 py-0.5 text-[11px] font-bold bg-[#FF5722]/10 text-[#FF5722] rounded-full">
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                      {unreadCount > 0 && (
                        <button
                          onClick={handleMarkAllRead}
                          className="text-[12px] text-[#FF5722] font-semibold hover:underline transition-all"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>

                    {/* Notification List */}
                    <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
                      {isNotificationsLoading ? (
                        [1, 2, 3].map((i) => (
                          <div key={i} className="px-4 py-3 flex items-start gap-3">
                            <Skeleton className="w-9 h-9 rounded-full shrink-0" />
                            <div className="flex-1 space-y-2">
                              <Skeleton className="h-4 w-3/4" />
                              <Skeleton className="h-3 w-full" />
                              <Skeleton className="h-2 w-1/4" />
                            </div>
                          </div>
                        ))
                      ) : notifications.length > 0 ? (
                        notifications.map((notif, i) => (
                          <motion.button
                            key={notif.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05, duration: 0.2 }}
                            onClick={() => handleNotifClick(notif.id)}
                            className={`w-full text-left flex items-start gap-3 px-4 py-3 transition-colors duration-150 ${notif.isRead ? 'bg-white hover:bg-gray-50' : 'bg-orange-50/60 hover:bg-orange-50'
                              }`}
                          >
                            {notifIconMap[notif.type] || notifIconMap.SYSTEM}
                            <div className="flex-1 min-w-0">
                              <p className={`text-[13px] leading-snug ${notif.isRead ? 'font-medium text-gray-600' : 'font-bold text-[#1C274C]'}`}>
                                {notif.title}
                              </p>
                              <p className="text-[12px] text-gray-400 mt-0.5 wrap-break-word">{notif.message}</p>
                              <p className="text-[11px] text-gray-300 mt-1">
                                {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                              </p>
                            </div>
                            {!notif.isRead && (
                              <span className="w-2 h-2 rounded-full bg-[#FF5722] shrink-0 mt-1.5" />
                            )}
                          </motion.button>
                        ))
                      ) : (
                        <div className="py-10 text-center px-4">
                          <p className="text-sm text-gray-400">No notifications yet</p>
                        </div>
                      )}
                    </div>


                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200" onClick={() => { setIsDropdownOpen(!isDropdownOpen); setIsNotificationOpen(false); }}>
                <Image
                  src={user?.profileImg || "/profile.webp"}
                  alt="User"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-55 "
                      onClick={() => setIsDropdownOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute right-0 mt-3 w-56 bg-white rounded-2xl border border-gray-50 py-2 z-60 overflow-hidden shadow-2xl border-t border-t-gray-400"
                    >
                      <div className="px-4 py-3 border-b border-gray-50 mb-1">
                        <p className="text-[14px] font-semibold text-[#1C274C]">{user?.fullName || 'My Account'}</p>
                        <p className="text-[11px] text-[#8E94A4]">{user?.email || 'Guest'}</p>
                      </div>

                      <Link href="/profile" className="w-full text-left px-4 py-2 text-[14px] text-[#424B5E] hover:bg-gray-50 transition-colors flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        Profile Settings
                      </Link>


                      <div className="border-t border-gray-50 mt-1 pt-1">
                        <button
                          onClick={logout}
                          className="w-full text-left px-4 py-2 text-[14px] text-red-500 hover:bg-red-50 transition-colors font-medium"
                        >
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-70 bg-[#FDF8F1] z-50 md:hidden shadow-2xl flex flex-col"
            >
              <div className="p-6 flex items-center justify-between border-b border-orange-50">
                <span className="text-lg font-bold text-[#FF5722]">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-500 hover:bg-white rounded-full border border-transparent hover:border-orange-100 transition-all"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-6 py-4 rounded-2xl text-[15px] font-semibold transition-all duration-300 ${isActive
                        ? 'bg-[#FF5722] text-white shadow-lg'
                        : 'bg-white text-gray-600 hover:bg-orange-50'
                        }`}
                    >
                      {link.name}
                    </Link>
                  )
                })}

            
              </div>

              <div className="p-6 border-t border-orange-50 bg-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#FF5722]/20">
                    <Image
                      src={user?.profileImg || "/images/profile.jpg"}
                      alt="User"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1C274C]">{user?.fullName || 'Guest'}</p>
                    <p className="text-[11px] text-[#8E94A4]">{user?.email || 'No email'}</p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="w-full py-3 rounded-xl bg-red-50 text-red-500 font-bold text-sm hover:bg-red-100 transition-colors"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>

  )
}

export default ProfileNavbar
