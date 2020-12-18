#/bin/sh
# cropIf.sh $file $height $width $cropTop $cropBottom $cropLeft $cropRight
#
# usefull for remove browser decorations from screenshots, requires imagemagick installed on your machine
#
# will just modify files if they match the given sourceWidth and sourceHeight
#
# can be easily integrated into a recursive find from basedirectory like this
# find . -not -path "./node_modules/*" -name "*png" -exec hacks/cropIf.sh {} 1032 835 68 2 2 2 \;


if [ "$#" -ne 7 ];
	then 
		echo "illegal number of parameters, expecting 6: file, sourceWidth, sourceHeight, cropTop, cropBottom, cropLeft, cropRight";
		exit 1
fi
file=$1
sourceWidth=$2
sourceHeight=$3
cropTop=$4
cropBottom=$5
cropLeft=$6
cropRight=$7

if [ ! -f $file ];
	then	
		echo "file $file does not exist"
		exit 1
fi

realHeight=`identify -format '%h' $file`
realWidth=`identify -format '%w' $file`

if [ $realHeight = $sourceHeight ] && [ $realWidth = $sourceWidth ];
	then
		newWidth=$(($sourceWidth-$cropLeft-$cropRight))
		newHeight=$(($sourceHeight-$cropTop-$cropBottom))
		convert $file -crop ${newWidth}x${newHeight}+${cropLeft}+${cropTop} +repage $file
		echo "converted $file"
fi
	

