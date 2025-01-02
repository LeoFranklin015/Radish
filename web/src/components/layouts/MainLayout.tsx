"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CustomConnectButton } from "@/components/ui/CustomConnectButton";
import { useAccount, useChainId } from "wagmi";
import { readContract } from "@wagmi/core";
import { useEffect, useState } from "react";
import { config } from "@/app/providers";
import { CONTRACT_ADDRESSES, ERC20_ABI } from "@/config/contracts";
import { parseEther } from "viem";

function NeoXLogo() {
    return (
        <svg
            width="69"
            height="31"
            viewBox="0 0 69 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M54.0469 21.6838L49.6466 26.931C48.8729 27.8536 47.4271 27.7639 46.7734 26.7527L45.5491 24.859C45.1436 24.2318 45.1704 23.4187 45.6164 22.8196L50.3025 16.5232L44.9956 9.0808C44.6367 8.57754 44.563 7.92469 44.8007 7.35412L45.7484 5.07945C46.2749 3.8157 47.9678 3.58749 48.8101 4.6667L54.0853 11.4253L61.7572 1.5387C62.4242 0.679129 63.6977 0.609013 64.455 1.39015L66.9967 4.01158C67.637 4.67204 67.6721 5.71047 67.0778 6.41266L58.3538 16.7206L65.5978 25.8727C66.295 26.7534 66.0175 28.0512 65.0212 28.5699L62.134 30.0731C61.3535 30.4794 60.3934 30.2579 59.8698 29.5506L54.0469 21.6838Z"
                stroke="#01E599"
                strokeWidth="1.37524"
            ></path>
            <path
                d="M9.44732 11.3358C10.3499 12.1381 10.8012 13.2974 10.8012 14.8138V22.3129C10.8012 22.5298 10.6254 22.7056 10.4085 22.7056H9.22323C9.00635 22.7056 8.83054 22.5298 8.83054 22.3129V15.5148C8.83054 14.2331 8.55474 13.3044 8.00314 12.7288C7.71596 12.4383 7.37101 12.2114 6.9906 12.0626C6.61019 11.9139 6.20279 11.8467 5.79476 11.8653C5.15288 11.8626 4.51923 12.0099 3.9444 12.2955C3.34147 12.6121 2.84771 13.1027 2.52731 13.7036C2.13247 14.4588 1.94165 15.3041 1.97371 16.1557V22.3129C1.97371 22.5298 1.79789 22.7056 1.58101 22.7056H0.392696C0.175816 22.7056 0 22.5298 0 22.3129V11.3357C0 11.0569 0.282383 10.8669 0.540627 10.9719L1.46398 11.3474C1.67274 11.4323 1.81477 11.6289 1.82981 11.8537L1.85937 12.2955C2.24045 11.5845 2.83501 11.011 3.55929 10.6558C4.32238 10.2946 5.15821 10.1134 6.00236 10.1263C7.26204 10.0811 8.49234 10.5131 9.44732 11.3358Z"
                fill="white"
            ></path>
            <path
                d="M24.8803 16.9377C24.8608 17.1333 24.6937 17.2785 24.4972 17.2785H15.5434C15.6577 18.5301 16.0729 19.5009 16.789 20.1909C17.1596 20.5387 17.5958 20.8094 18.072 20.9871C18.5483 21.1647 19.0551 21.2459 19.563 21.2259C20.342 21.2534 21.1161 21.0924 21.8195 20.7565C22.2526 20.5479 22.6101 20.2161 22.8503 19.8074C22.971 19.602 23.2294 19.4981 23.4406 19.6085L24.3386 20.0779C24.5332 20.1797 24.6078 20.4222 24.4877 20.6062C24.0412 21.2905 23.435 21.8589 22.7191 22.2609C21.7435 22.7573 20.6569 22.9956 19.563 22.9529C17.7036 22.9529 16.2444 22.3853 15.1853 21.25C14.1263 20.1147 13.5958 18.5451 13.5938 16.5414C13.5938 14.5356 14.0952 12.965 15.0981 11.8297C16.101 10.6945 17.5361 10.1268 19.4035 10.1268C20.45 10.1003 21.4832 10.3649 22.3882 10.891C23.2095 11.3822 23.8694 12.1028 24.2867 12.964C24.7237 13.8793 24.9431 14.8833 24.9275 15.8975C24.9304 16.2449 24.9146 16.5922 24.8803 16.9377ZM16.789 12.8076C16.1211 13.4494 15.7139 14.352 15.5675 15.5154H23.0411C22.9753 14.5116 22.5761 13.5585 21.9068 12.8076C21.5822 12.4807 21.193 12.2251 20.7641 12.0572C20.3351 11.8894 19.8758 11.8129 19.4156 11.8327C18.9349 11.812 18.4549 11.8876 18.0039 12.055C17.5528 12.2224 17.1398 12.4783 16.789 12.8076Z"
                fill="white"
            ></path>
            <path
                d="M37.9954 11.8309C39.0564 12.9641 39.587 14.5347 39.587 16.5425C39.587 18.5503 39.0564 20.1198 37.9954 21.2511C36.9363 22.3864 35.4771 22.954 33.6177 22.954C31.7583 22.954 30.2991 22.3864 29.2401 21.2511C28.179 20.1178 27.6484 18.5483 27.6484 16.5425C27.6484 14.5367 28.179 12.9661 29.2401 11.8309C30.2991 10.6976 31.7583 10.1299 33.6177 10.1279C35.4771 10.1259 36.9363 10.6936 37.9954 11.8309ZM30.6812 13.0885C29.9752 13.9289 29.6221 15.0802 29.6221 16.5425C29.6221 18.0047 29.9752 19.155 30.6812 19.9935C31.3873 20.8319 32.3661 21.2511 33.6177 21.2511C34.8693 21.2511 35.8472 20.8319 36.5512 19.9935C37.2572 19.155 37.6112 18.0047 37.6132 16.5425C37.6153 15.0802 37.2612 13.9289 36.5512 13.0885C35.8431 12.2481 34.8653 11.8289 33.6177 11.8309C32.3701 11.8329 31.3903 12.2521 30.6782 13.0885H30.6812Z"
                fill="white"
            ></path>
        </svg>
    );
}


function LensLogo() {
    return (<svg
        width="80"
        height="20"
        viewBox="0 0 80 20"
        fill="none" xmlns="http://www.w3.org/2000/svg" >
        <path fill-rule="evenodd" clip-rule="evenodd"
            d="M21.1625 5.66312C22.1496 4.74966 23.4447 4.18348 24.8881 4.18298C28.0955 4.18405 30.6939 6.78463 30.6939 9.9942C30.6939 12.7709 27.9461 15.1454 27.2592 15.6922C24.0469 18.2502 19.8628 19.746 15.3469 19.746C10.8311 19.746 6.64696 18.2502 3.43472 15.6922C2.75168 15.1454 0 12.767 0 9.9942C0 6.78397 2.59946 4.18298 5.80389 4.18298C7.24803 4.18298 8.54386 4.74926 9.53134 5.66312L9.63282 5.61235C9.8592 2.61691 12.2947 0.25415 15.3469 0.25415C18.3992 0.25415 20.8347 2.61691 21.0611 5.61235L21.1625 5.66312ZM22.3218 11.4404C22.7628 11.8817 23.079 12.4128 23.2546 12.9947H23.2585C23.3405 13.2603 23.157 13.5376 22.8838 13.5844C22.6535 13.6235 22.4311 13.479 22.3608 13.2525C22.2281 12.8229 21.9939 12.4284 21.666 12.1004C21.1352 11.5693 20.4288 11.2763 19.6755 11.2763C19.6462 11.2763 19.6179 11.2783 19.5896 11.2803C19.5613 11.2822 19.533 11.2842 19.5037 11.2842C19.9253 11.4794 20.2219 11.9051 20.2219 12.4011C20.2219 13.0845 19.6716 13.6352 18.9885 13.6352C18.3055 13.6352 17.7552 13.0806 17.7552 12.4011C17.7552 12.2449 17.7864 12.0926 17.841 11.9559C17.7864 12.0028 17.7317 12.0496 17.681 12.1004C17.3531 12.4284 17.119 12.8229 16.9862 13.2525C16.9199 13.479 16.6974 13.6235 16.4632 13.5844C16.19 13.5376 16.0066 13.2603 16.0885 12.9947C16.2642 12.4128 16.5803 11.8817 17.0214 11.4404C17.7278 10.7335 18.6724 10.343 19.6716 10.343C20.6708 10.343 21.6153 10.7335 22.3218 11.4404ZM10.9405 11.2803L10.9405 11.2803L10.9405 11.2803C10.9688 11.2784 10.9971 11.2764 11.0264 11.2764C11.7797 11.2764 12.4861 11.5693 13.0169 12.1005C13.3448 12.4285 13.579 12.823 13.7117 13.2526C13.7819 13.4791 14.0044 13.6236 14.2347 13.5845C14.5079 13.5377 14.6914 13.2604 14.6094 12.9948C14.4338 12.4129 14.1176 11.8818 13.6766 11.4405C12.9701 10.7336 12.0256 10.3431 11.0264 10.3431C10.0272 10.3431 9.08263 10.7336 8.37617 11.4405C7.93512 11.8818 7.61897 12.4129 7.44333 12.9948C7.36136 13.2604 7.54481 13.5377 7.81803 13.5845C8.05221 13.6236 8.27469 13.4791 8.34104 13.2526C8.47374 12.823 8.70793 12.4285 9.03579 12.1005C9.08653 12.0497 9.14117 12.0028 9.19582 11.956C9.14117 12.0927 9.10995 12.245 9.10995 12.4012C9.10995 13.0807 9.66028 13.6353 10.3433 13.6353C11.0264 13.6353 11.5767 13.0846 11.5767 12.4012C11.5767 11.9052 11.2801 11.4795 10.8585 11.2843H10.8546C10.8839 11.2843 10.9122 11.2823 10.9405 11.2803ZM15.3512 15.7909C16.0694 15.7909 16.7251 15.5176 17.2247 15.0723C17.4082 14.9122 17.6775 14.9044 17.857 15.0645C18.06 15.2442 18.0717 15.5683 17.8687 15.7519C17.2052 16.3572 16.3192 16.7282 15.3512 16.7282C14.3833 16.7282 13.5012 16.3572 12.8337 15.7519C12.6308 15.5683 12.6425 15.2481 12.8454 15.0645C13.0289 14.9005 13.2982 14.9122 13.4777 15.0723C13.9734 15.5176 14.6331 15.7909 15.3512 15.7909Z"
            fill="#444444"
            style={{ fill: "#444444", fillOpacity: 1 }}
        />
        <g clip-path="url(#clip0_4778_743)">
            <path
                d="M74.5344 16.914C77.716 16.914 80.0002 15.6087 80.0002 12.9982C80.0002 11.1219 78.8157 9.80032 76.2476 8.83769L75.5949 8.59295C74.5703 8.20872 73.9633 7.85874 73.9633 7.20611C73.9633 5.73769 77.2265 6.30874 78.9397 6.71664L79.837 3.94295C78.7765 3.61664 77.6344 3.3719 76.0028 3.3719C72.7397 3.3719 70.6186 5.00348 70.6186 7.28769C70.6186 9.00085 71.8292 10.0907 73.4739 10.7956L74.616 11.2851C76.0934 11.9181 76.8186 12.1824 76.8186 12.8351C76.8186 13.4061 76.0028 13.8956 74.616 13.8956C73.5555 13.8956 72.4133 13.7324 71.1897 13.4877L70.7818 16.4245C71.6791 16.6693 72.9028 16.914 74.5344 16.914ZM58.7081 16.7509H61.9712V8.91927C61.9712 7.20611 62.8686 6.22716 64.337 6.22716C65.8054 6.22716 66.6212 7.28769 66.6212 9.00085V16.7509H69.8844V8.75611C69.8844 5.49295 68.0897 3.20874 64.337 3.20874C60.9923 3.20874 58.7081 5.49295 58.7081 8.75611V16.7509ZM44.3502 16.914C45.4923 16.914 46.3897 16.7509 47.2054 16.4245L46.8791 13.4061C44.5949 13.8956 41.9028 13.9772 41.9028 11.2851V3.77979H38.6396V11.6114C38.6396 15.1193 40.6791 16.914 44.3502 16.914ZM46.716 9.9798C46.716 15.2604 50.4621 16.9817 53.8182 16.9817C55.1488 16.9817 56.5258 16.7109 57.548 16.2842L57.1475 13.4012C56.069 13.7104 54.9457 13.8156 53.9218 13.8156C51.8318 13.8156 49.9065 13.1222 49.9065 10.2825V9.73506C49.9065 7.49572 51.0135 6.31037 52.6541 6.31037C53.7309 6.31037 54.6299 6.93037 54.6299 8.10348C54.6299 9.52866 52.7365 10.1748 49.3273 10.0614L49.4905 11.9377C53.7758 13.1565 57.8115 11.8422 57.8115 8.0219C57.8115 5.32816 55.7525 3.45021 52.7773 3.45021C49.1976 3.45021 46.7168 6.00364 46.7168 9.9798H46.716Z"
                fill="#00E599"
                style={{ fill: "#00E599", fillOpacity: 1 }}
            />
        </g>
        <defs>
            <clipPath id="clip0_4778_743">
                <rect
                    width="41.3605"
                    height="13.773"
                    fill="white"
                    style={{ fill: "white", fillOpacity: 1 }}
                    transform="translate(38.6392 3.20874)"
                />
            </clipPath>
        </defs>
    </svg>)

}
export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { address } = useAccount();
    const chainId = useChainId();
    const [balance, setBalance] = useState(0.0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (address) {
            const fetchBalance = async () => {
                const balance = await readContract(config, {
                    address: CONTRACT_ADDRESSES[chainId].mockERC20,
                    abi: ERC20_ABI,
                    functionName: "balanceOf",
                    args: [address],
                });
                setBalance(parseFloat(balance.toString()) / 1e18);
            };

            fetchBalance();
        }
    }, [address, chainId]);

    return (
        <div className="min-h-screen bg-white">
            <header className="bg-black text-white py-2 p-shadow relative">
                <div className="container mx-auto py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <Link href="/markets">
                                <h1 className="font-bold text-3xl flex items-center gap-2">
                                    <span className="text-neo-green hue-rotate-180">📈🥕</span>
                                    <span className="text-neo-green">RADISH</span>
                                </h1>
                            </Link>
                            <div className="hidden md:flex items-center gap-2">
                                <span className="text-gray-400">powered by</span>
                                <LensLogo />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex px-4 py-2 bg-black/30 rounded-lg">
                                <span className="mr-1 text-gray-400">Balance:</span>{" "}
                                <span className="text-neo-green font-medium"> {balance} USDC</span>
                            </div>
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                                aria-label="Toggle menu"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    {isMenuOpen ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    )}
                                </svg>
                            </button>
                            <CustomConnectButton />
                        </div>
                    </div>
                </div>

                {/* Dropdown Menu */}
                <div
                    className={`absolute top-full left-0 right-0 bg-zinc-900 border-t border-gray-800 transition-all duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                        }`}
                >
                    <div className="container mx-auto py-4">
                        <nav className="flex flex-col gap-4">
                            <Link href="/markets" onClick={() => setIsMenuOpen(false)}>
                                <span className="block px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors">
                                    Markets
                                </span>
                            </Link>
                            <Link href="/create" onClick={() => setIsMenuOpen(false)}>
                                <span className="block px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors">
                                    Create
                                </span>
                            </Link>
                            <Link href="/my-predictions" onClick={() => setIsMenuOpen(false)}>
                                <span className="block px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors">
                                    My Positions
                                </span>
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="container mx-auto py-8 min-h-[calc(100vh-300px)]">
                {children}
            </main>

            <footer className="bg-black text-white mt-12">
                <div className="container mx-auto py-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="font-bold text-3xl mb-2">RADISH</h3>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-gray-400">powered by</span>
                                <LensLogo />
                            </div>
                            <p className="text-gray-400">
                                Prediction markets for creators and their fans, earn rewards for
                                betting on your favorite creators.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-xl mb-4">Links</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/markets">
                                        <span className="text-gray-400 hover:text-neo-green transition-colors">
                                            Markets
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/create">
                                        <span className="text-gray-400 hover:text-neo-green transition-colors">
                                            Create Market
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/my-predictions">
                                        <span className="text-gray-400 hover:text-neo-green transition-colors">
                                            My Positions
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-xl mb-4">Community</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a
                                        href="https://twitter.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-neo-green transition-colors"
                                    >
                                        Twitter
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://discord.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-neo-green transition-colors"
                                    >
                                        Discord
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://github.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-neo-green transition-colors"
                                    >
                                        GitHub
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>
                            &copy; {new Date().getFullYear()} radish. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
