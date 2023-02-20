import Button from '../button/Button';

const Chat = () => {
	return (
		<div className='flex grow flex-col text-center'>
			<div className='p-4'>
				<h2 className='text-xl font-semibold'>User Name</h2>
			</div>
			<div className='customScroll mr-4 grow overflow-y-auto px-4'>
				<ul className='customScroll flex flex-col gap-y-4'>
					<li className='message max-w-[80%]'>
						<article className='flex items-end gap-x-3 '>
							<img
								src='/person-icon.png'
								alt='User Name'
								className='h-6 w-6 rounded-full'
							/>
							<p className='rounded-lg bg-slate-100/20 p-3 text-left'>
								Some very loooong
							</p>
						</article>
					</li>
					<li className='message message-owner max-w-[80%]'>
						<article className='flex items-end gap-x-3 '>
							<img
								src='/person-icon.png'
								alt='User Name'
								className='h-6 w-6 rounded-full'
							/>
							<p className='rounded-lg bg-slate-100/20 p-3 text-left'>
								Some very loooong
							</p>
						</article>
					</li>
					<li className='message max-w-[80%]'>
						<article className='flex items-end gap-x-3 '>
							<img
								src='/person-icon.png'
								alt='User Name'
								className='h-6 w-6 rounded-full'
							/>
							<p className='rounded-lg bg-slate-100/20 p-3 text-left'>
								Some very loooong
							</p>
						</article>
					</li>
					<li className='message message-owner max-w-[80%]'>
						<article className='flex items-end gap-x-3 '>
							<img
								src='/person-icon.png'
								alt='User Name'
								className='h-6 w-6 rounded-full'
							/>
							<p className='rounded-lg bg-slate-100/20 p-3 text-left'>
								Some very loooongSome very loooongSome very loooongSome very
								loooongSome very loooongSome very loooongSome very loooongSome
								very loooongSome very loooongSome very loooongSome very
								loooongSome very loooongSome very loooongSome very loooongSome
								very loooongSome very loooongSome very loooongSome very
								loooongSome very loooongSome very loooongSome very loooongSome
								very loooongSome very loooongSome very loooongSome very
								loooongSome very loooongSome very loooongSome very loooongSome
								very loooongSome very loooong
							</p>
						</article>
					</li>
					<li className='message max-w-[80%]'>
						<article className='flex items-end gap-x-3 '>
							<img
								src='/person-icon.png'
								alt='User Name'
								className='h-6 w-6 rounded-full'
							/>
							<p className='rounded-lg bg-slate-100/20 p-3 text-left'>
								Some very loooong
							</p>
						</article>
					</li>
					<li className='message message-owner max-w-[80%]'>
						<article className='flex items-end gap-x-3 '>
							<img
								src='/person-icon.png'
								alt='User Name'
								className='h-6 w-6 rounded-full'
							/>
							<p className='rounded-lg bg-slate-100/20 p-3 text-left'>
								Some very loooong
							</p>
						</article>
					</li>
					<li className='message max-w-[80%]'>
						<article className='flex items-end gap-x-3 '>
							<img
								src='/person-icon.png'
								alt='User Name'
								className='h-6 w-6 rounded-full'
							/>
							<p className='rounded-lg bg-slate-100/20 p-3 text-left'>
								loooongloooongloooongloooongloooongloooongloooongloooongloooongloooongloooongloooongloooongloooongloooongloooongloooongloooongloooongloooongloooongloooongloooongloooongloooongloooongloooongloooongloooongloooongloooongloooongloooongloooongloooongloooongloooongloooongloooongloooong
							</p>
						</article>
					</li>
					<li className='message message-owner max-w-[80%]'>
						<article className='flex items-end gap-x-3 '>
							<img
								src='/person-icon.png'
								alt='User Name'
								className='h-6 w-6 rounded-full'
							/>
							<p className='rounded-lg bg-slate-100/20 p-3 text-left'>
								Some very loooong
							</p>
						</article>
					</li>
					<li className='message max-w-[80%]'>
						<article className='flex items-end gap-x-3 '>
							<img
								src='/person-icon.png'
								alt='User Name'
								className='h-6 w-6 rounded-full'
							/>
							<p className='rounded-lg bg-slate-100/20 p-3 text-left'>
								Some very loooong
							</p>
						</article>
					</li>
					<li className='message message-owner max-w-[80%]'>
						<article className='flex items-end gap-x-3 '>
							<img
								src='/person-icon.png'
								alt='User Name'
								className='h-6 w-6 rounded-full'
							/>
							<p className='rounded-lg bg-slate-100/20 p-3 text-left'>
								Some very loooongSome very loooongSome very loooongSome very
								loooongSome very loooongSome very loooongSome very loooongSome
								very loooongSome very loooongSome very loooongSome very
								loooongSome very loooongSome very loooongSome very loooongSome
								very loooongSome very loooongSome very loooongSome very
								loooongSome very loooongSome very loooongSome very loooongSome
								very loooongSome very loooongSome very loooongSome very loooong
							</p>
						</article>
					</li>
					<li className='message max-w-[80%]'>
						<article className='flex items-end gap-x-3 '>
							<img
								src='/person-icon.png'
								alt='User Name'
								className='h-6 w-6 rounded-full'
							/>
							<p className='rounded-lg bg-slate-100/20 p-3 text-left'>
								Some very loooong
							</p>
						</article>
					</li>
				</ul>
			</div>
			<div className='p-4'>
				<form className='flex items-center'>
					<div className='grow'>
						<label htmlFor='message'></label>
						<textarea
							onFocus={(e) => {
								e.target.animate(
									[{ minHeight: '60px' }, { minHeight: '100px' }],
									{
										duration: 300,
										iterations: 1,
										easing: 'ease',
										fill: 'forwards',
									}
								);
							}}
							onBlur={(e) => {
								e.target.animate(
									[{ minHeight: '100px' }, { minHeight: '60px' }],
									{
										duration: 300,
										iterations: 1,
										easing: 'ease',
										fill: 'forwards',
									}
								);
							}}
							name='message'
							id='message'
							placeholder='Send a message...'
							className='textAreaMessage w-full resize-none rounded-lg bg-transparent px-4 py-2 outline-none transition-colors placeholder:text-slate-200/80 hover:bg-slate-200/20 focus:bg-slate-200/20'
						/>
					</div>
					<div className='mx-4'>
						<label
							htmlFor='files'
							className='cursor-pointer transition-opacity hover:opacity-80'
						>
							<img
								src='/paperclip.png'
								alt='paperclip'
								className='w-6 rotate-45'
							/>
						</label>
						<input type='file' name='files' id='files' className='hidden' />
					</div>

					<Button style='p-3 transition-opacity hover:opacity-80'>
						<img src='/sendIcon.png' alt='sendIcon' className='h-6 w-6' />
					</Button>
				</form>
			</div>
		</div>
	);
};

export default Chat;
