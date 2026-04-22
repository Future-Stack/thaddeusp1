"use client";
import AnimationWrapper from "@/components/AnimationWrapper";
import { motion } from "framer-motion";
import Image from "next/image";

export default function RealStories() {
    return (
        <section className="relative py-12 md:py-24 bg-[#FFFBF7] overflow-hidden">
            {/* 🔹 Background Line */}
            <div className="absolute inset-0 pointer-events-none">
                <Image
                    src="/line.png"
                    alt="line"
                    fill
                    className="object-contain relative -top-10 opacity-40"
                />
            </div>

            {/* Header */}
            <div className="text-center mb-16 md:mb-24 px-4">
                <AnimationWrapper animationType="fadeUp">
                    <h2 className="text-3xl sm:text-4xl md:text-[42px] font-black text-[#1A202C] mb-4 tracking-tight">
                        Real Stories, Real Impact
                    </h2>
                </AnimationWrapper>
                <AnimationWrapper animationType="fadeUp" delay={0.1}>
                    <p className="text-gray-500 text-base md:text-lg font-medium opacity-80">
                        Meet some of the people your tickets have helped
                    </p>
                </AnimationWrapper>

                {/* Ornament */}
                <AnimationWrapper
                    animationType="scaleUp"
                    delay={0.2}
                    className="flex items-center justify-center gap-3 mt-6 md:mt-8"
                >
                    <div className="flex flex-col gap-1.5">
                        <div className="h-[1.5px] w-8 sm:w-12 md:w-16 bg-[#FFE5D3]" />
                        <div className="h-[1.5px] w-6 sm:w-10 md:w-14 bg-[#FFE5D3]" />
                    </div>
                    <div className="flex items-center -space-x-2">
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full border-[3px] border-[#FF8A65] flex items-center justify-center bg-white">
                            <div className="w-1 h-1 bg-[#FF8A65] rounded-full" />
                        </div>
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full border-[3px] border-[#9370DB] flex items-center justify-center bg-white">
                            <div className="w-1 h-1 bg-[#9370DB] rounded-full" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1.5 items-end">
                        <div className="h-[1.5px] w-8 sm:w-12 md:w-16 bg-[#FFE5D3]" />
                        <div className="h-[1.5px] w-6 sm:w-10 md:w-14 bg-[#FFE5D3]" />
                    </div>
                </AnimationWrapper>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                {/* Responsive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-4 justify-items-center">
                    {/* first item */}
                    <AnimationWrapper animationType="fadeUp" delay={0.2}>
                        <motion.div
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="flex flex-col items-center"
                        >
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{
                                    duration: 6, // Slower for smoothness
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.8, // Start after entry (0.2 delay + 0.6 duration)
                                }}
                                className="relative w-36 sm:w-40 md:w-45 h-32 sm:h-36 md:h-40 mx-auto"
                            >
                                <svg
                                    viewBox="0 0 217 187"
                                    className="absolute top-0 -left-2 w-full h-full"
                                >
                                    <path
                                        d="M105.967 1.29283C126.589 6.24147 131.724 33.6049 148.73 46.2765C165.381 58.6838 191.426 56.3702 203.011 73.6038C215.645 92.3989 221.117 118.951 211.302 139.361C201.624 159.487 175.593 163.767 155.236 172.95C139.289 180.143 123.461 186.807 105.967 186.878C88.4125 186.949 72.3523 180.689 56.4058 173.35C36.3899 164.138 9.61654 159.585 1.85514 138.963C-5.89172 118.38 12.6493 97.9219 20.2496 77.2843C27.4717 57.6737 29.5056 35.2829 45.1434 21.4194C61.5242 6.89713 84.6796 -3.8153 105.967 1.29283Z"
                                        className="fill-[#18687A]"
                                    />
                                </svg>
                                <Image
                                    src={"/time/1.svg"}
                                    alt="story"
                                    fill
                                    className="object-cover"
                                    style={{
                                        clipPath:
                                            "path('M105.967 1.29283C126.589 6.24147 131.724 33.6049 148.73 46.2765C165.381 58.6838 191.426 56.3702 203.011 73.6038C215.645 92.3989 221.117 118.951 211.302 139.361C201.624 159.487 175.593 163.767 155.236 172.95C139.289 180.143 123.461 186.807 105.967 186.878C88.4125 186.949 72.3523 180.689 56.4058 173.35C36.3899 164.138 9.61654 159.585 1.85514 138.963C-5.89172 118.38 12.6493 97.9219 20.2496 77.2843C27.4717 57.6737 29.5056 35.2829 45.1434 21.4194C61.5242 6.89713 84.6796 -3.8153 105.967 1.29283Z')",
                                    }}
                                />
                            </motion.div>
                            <div
                                className="px-4 py-2 text-center w-40 sm:w-44 md:w-50 h-40 sm:h-44 md:h-50 flex justify-center items-center bg-contain bg-center bg-no-repeat"
                                style={{
                                    backgroundImage: `url(/time/top.png)`,
                                }}
                            >
                                <div className="mt-2">
                                    <p className="text-sm sm:text-base md:text-[18px] text-[#101828] font-semibold leading-tight font-inter">
                                        Safe Inc. of Schenectady
                                    </p>
                                    <p className="text-xs text-gray-500">1344 Albany St</p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimationWrapper>

                    {/* second item */}
                    <AnimationWrapper animationType="fadeUp" delay={0.4}>
                        <motion.div
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="flex flex-col items-center"
                        >
                            <div
                                className="px-4 py-2 text-center w-40 sm:w-44 md:w-50 h-40 sm:h-44 md:h-50 flex justify-center items-center bg-contain bg-center bg-no-repeat"
                                style={{
                                    backgroundImage: `url(/time/bottom.png)`,
                                }}
                            >
                                <div className="-mt-4">
                                    <p className="text-sm sm:text-base md:text-[18px] font-inter text-[#101828] font-semibold">
                                        Fish Inc.-Dunellen
                                    </p>
                                    <p className="text-xs text-gray-500">450 New Market Rd</p>
                                </div>
                            </div>
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{
                                    duration: 7, // Slower
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 1.0, // Start after entry
                                }}
                                className="relative w-36 sm:w-40 md:w-45 h-36 sm:h-42 md:h-47.25 mx-auto"
                            >
                                <svg
                                    viewBox="0 0 179 190"
                                    className="absolute top-2 -left-3 w-full h-full"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M90.2031 7.58676C106.359 10.7922 121.1 16.6699 135.507 24.653C150.867 33.1646 170.169 39.3369 176.827 55.5868C183.469 71.7959 172.827 89.3788 169.038 106.481C165.561 122.173 165.631 139.251 155.523 151.747C145.276 164.414 128.77 168.92 113.64 174.965C96.9579 181.63 80.3265 192.269 62.6935 188.836C44.637 185.32 28.9409 172.254 19.2894 156.594C10.2339 141.901 14.9858 123.386 11.8916 106.406C8.6369 88.5452 -2.80363 72.0697 0.638726 54.244C4.44519 34.5327 13.8536 13.3236 31.658 4.04866C49.3555 -5.17056 70.6299 3.70328 90.2031 7.58676Z"
                                        className="fill-[#18687A]"
                                    />
                                </svg>
                                <Image
                                    src="/time/2.svg"
                                    alt="story"
                                    fill
                                    className="object-cover"
                                    style={{
                                        clipPath:
                                            "path('M90.2031 7.58676C106.359 10.7922 121.1 16.6699 135.507 24.653C150.867 33.1646 170.169 39.3369 176.827 55.5868C183.469 71.7959 172.827 89.3788 169.038 106.481C165.561 122.173 165.631 139.251 155.523 151.747C145.276 164.414 128.77 168.92 113.64 174.965C96.9579 181.63 80.3265 192.269 62.6935 188.836C44.637 185.32 28.9409 172.254 19.2894 156.594C10.2339 141.901 14.9858 123.386 11.8916 106.406C8.6369 88.5452 -2.80363 72.0697 0.638726 54.244C4.44519 34.5327 13.8536 13.3236 31.658 4.04866C49.3555 -5.17056 70.6299 3.70328 90.2031 7.58676Z')",
                                    }}
                                />
                            </motion.div>
                        </motion.div>
                    </AnimationWrapper>

                    {/* third item */}
                    <AnimationWrapper animationType="fadeUp" delay={0.6}>
                        <motion.div
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="flex flex-col items-center"
                        >
                            <motion.div
                                animate={{ y: [0, -12, 0] }}
                                transition={{
                                    duration: 6.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 1.2, // Start after entry
                                }}
                                className="relative w-36 sm:w-40 md:w-45.75 h-40 sm:h-45 md:h-50.25 mx-auto"
                            >
                                <svg
                                    viewBox="0 0 183 201"
                                    className="absolute top-0 -left-2 w-full h-full"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M94.5122 10.9553C111.357 10.5077 129.159 -6.09191 143.696 2.42889C158.723 11.2366 156.388 34.1773 162.166 50.609C166.382 62.5993 169.964 74.3129 173.287 86.581C176.73 99.296 182.806 111.415 182.196 124.574C181.542 138.684 179.854 154.707 169.676 164.502C159.371 174.42 141.989 170.209 128.867 175.9C116.365 181.322 107.799 194.071 94.5122 197.1C80.3665 200.324 62.7488 202.879 51.6835 193.495C39.8199 183.434 46.4156 162.664 38.2757 149.408C31.4426 138.281 15.5157 135.411 9.04931 124.067C2.05236 111.792 0.861077 97.222 0.477962 83.0981C0.0293101 66.5581 -1.79176 48.7172 6.61892 34.4683C15.1364 20.0383 30.3839 9.33991 46.5709 5.00961C62.3242 0.795324 78.2106 11.3884 94.5122 10.9553Z"
                                        className="fill-[#18687A]"
                                    />
                                </svg>
                                <Image
                                    src="/time/3.svg"
                                    alt="story"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                            <div
                                className="px-4 py-2 text-center w-48 sm:w-52 md:w-60 h-40 sm:h-45 md:h-50 flex justify-center items-center bg-contain bg-center bg-no-repeat"
                                style={{
                                    backgroundImage: `url(/time/top.png)`,
                                }}
                            >
                                <div>
                                    <p className="text-sm sm:text-base md:text-[18px] text-[#101828] font-inter font-semibold">
                                        Star Gospel Mission of Charleston
                                    </p>
                                    <p className="text-xs text-gray-500">474 Meeting St</p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimationWrapper>

                    {/* fourth item */}
                    <AnimationWrapper animationType="fadeUp" delay={0.7}>
                        <motion.div
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="flex flex-col items-center mt-0 sm:mt-0 lg:mt-0"
                        >
                            <div
                                className="px-4 py-2 text-center w-40 sm:w-44 md:w-50 h-40 sm:h-44 md:h-50 flex justify-center items-center bg-contain bg-center bg-no-repeat"
                                style={{
                                    backgroundImage: `url(/time/bottom.png)`,
                                }}
                            >
                                <div className="-mt-3">
                                    <p className="text-sm sm:text-base md:text-[18px] text-[#101828] font-inter font-semibold">
                                        Pine Street Inn of Boston
                                    </p>
                                    <p className="text-xs text-gray-500">444 Harrison Ave</p>
                                </div>
                            </div>
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{
                                    duration: 5.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 1.3, // Start after entry
                                }}
                                className="relative w-36 sm:w-40 md:w-44.75 h-40 sm:h-45 md:h-50.25 mx-auto"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute top-0 -left-4"
                                    width="179"
                                    height="201"
                                    viewBox="0 0 179 201"
                                    fill="none"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M104.568 10.4325C118.953 2.99198 142.6 -6.55288 152.372 6.36228C165.307 23.4581 147.709 48.4407 149.49 69.8045C150.202 78.3375 156.448 85.1071 159.602 93.0676C163.227 102.216 167.261 110.896 169.562 120.464C172.956 134.575 183.635 150.331 176.399 162.913C169.627 174.69 150.106 168.897 138.078 175.215C125.507 181.818 118.645 202.509 104.568 200.644C89.5627 198.657 87.9885 174.766 75.0757 166.87C63.9396 160.059 48.5739 165.691 37.1336 159.406C23.9108 152.141 10.9348 142.222 4.98329 128.358C-1.09427 114.201 -1.92004 96.8566 4.21517 82.7241C10.3027 68.7015 24.3239 59.4642 37.9231 52.4816C49.4737 46.5509 64.8482 52.8817 75.8293 45.9532C88.8734 37.7231 90.8682 17.5184 104.568 10.4325Z"
                                        fill="#18687A"
                                    />
                                </svg>
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        clipPath: `url(/time/4.svg)`,
                                    }}
                                >
                                    <Image
                                        src="/time/4.svg"
                                        alt="blob image"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </motion.div>
                        </motion.div>
                    </AnimationWrapper>
                </div>
            </div>
        </section>
    );
}