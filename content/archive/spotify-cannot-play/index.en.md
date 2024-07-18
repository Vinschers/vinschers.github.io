+++
title = 'Arch Linux: How to fix local file playing error on Spotify'
date = 2024-07-18
draft = false
+++

## The problem

For some time, I've had the premium subscription of Spotify and it has been great.
However, often times there are songs that I wish I could listen to which are simply not available in Spotify's library.
Fortunately for us, Spotify has this nice feature where you can use its client to listen to local files.
In other words, we can listen to music that is not available on Spotify by simply downloading and importing it.
Of course, using this feature has its own problems, like syncing the local files between your devices.
I will not be discussing these issues here, though.

Although the local files playing feature worked greatly in my Android phone, when it comes to my Linux desktop, the Spotify client refused to play the imported songs.
I kept getting the following error:
![error image](/spotify-cannot-play/error.png "500")

"Spotify can't play this right now. If you have the file on your computer you can import it."

## The fix

In order to play local files, Spotify relies in some libraries that were not present in my system.
They can be easy installed with the following command:

`sudo pacman -S ffmpeg4.4`

After that, just restart Spotify and your local files should be playing.

## Why this fix works (and how you might fix it in other distros)

From what I understand, Spotify requires some ffmpeg libraries to play the local files.
However, the version of the client available for Linux was built in an older version of ffmpeg.
Since Arch Linux has a newer version of ffmpeg installed, Spotify won't recognize the libraries and simply not play the MP3s.
Thus, the solution is installing an ancient version of the ffmpeg library that Spotify uses.
I believe the particular library that is missing is `libavcodec`.

Before being able to fix the problem, I read many posts about it and most of the solutions resolved around a library called "ffmpeg-compat".
In Arch Linux, there used to be two AUR packages that seemed to solve this issue: `ffmpeg-compat-57` and `ffmpeg-compat-59`.
Both packages shipped with the correct version of `libavcodec`.
Unfortunately, these packages are now no longer available.
Even though the AUR currently contains `ffmpeg-compat-54` and `ffmpeg-compat-55`, both packages wouldn't compile in my system for some reason.

The next best thing to do is install the whole ffmpeg suite in an older version.
Don't worry, this will not conflict with the current ffmpeg version you might already have installed.
AUR has ffmpeg versions 6.1 and 5.1 available, but only version 5.1 ships with the library we need.
I tried installing it from source but after about 10 minutes, the compilation failed with an error.
I tried to recompile several times, but the error persisted.
I am not sure why this happened with me; if you are able to install this package, it is probably the best solution so far.

Luckily, there is an even older version of ffmpeg in the *extra* repository in pacman, `ffmpeg4.4`.
That is what I went on with and it worked like a charm!
If you use a different distribution, try to search for older versions of `libavcodec` or ffmpeg in your package manager.

I hope this blog has helped you to listen to your beloved music on Spotify!
