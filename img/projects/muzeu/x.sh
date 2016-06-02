#!/bin/bash

set -e

file=$1
folder=$2

function main {
	for name in `imgName`;
	do
		echo " - file:" $name
		echo "   title:" `getTitle`
		echo "   size:" `getSize`
#		echo " - file: $name\n   title: `getTitle`   size: `getSize`" >> a.md
	done;
}

function imgName {
	cat $file | grep -E " - file: " | cut -d':' -f2
}

function getSize {
	file $folder/$name | grep -Eo "[0-9]{3,4}x[0-9]{3,4}"
}

function getTitle {
	lineNo=$(cat $file | grep -nr $name | cut -d':' -f2)
	titleLine=$(expr $lineNo + 1)
	sed -n $titleLine'{p;q}' $file | cut -d':' -f2
}

main
