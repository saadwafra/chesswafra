import React from 'react';
import Image from 'next/image';

export default function Footer() {
	return (
		<footer className="w-full py-6 px-4 bg-slate-900/80 border-t border-white/10 flex flex-col items-center text-center z-10 relative">
			<div className="text-white/80 text-sm mb-2">
				All Rights Reserved ©️ 2025 ChessReps | Powered by
				<a
					href="https://wafra.com/"
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center group ml-1"
					style={{ textDecoration: 'none' }}
				>
					<Image
						src="/wafra-logo.png"
						alt="WAFRA Logo"
						width={22}
						height={22}
						className="inline-block align-middle ml-1 mr-1 transition-transform group-hover:scale-110"
					/>
					<span className="text-amber-400 font-bold text-base group-hover:underline ml-0">WAFRA</span>
				</a>
			</div>
		</footer>
	);
}
