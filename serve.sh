docker run --rm -it -v $(pwd):/var/www -w /var/www -p 80:1234 -u $UID:$(id -g) node npx parcel $1
