const albums = [
    {
        id: 2125,
        title: 'Use Your Illusion',
        artist: "Guns N' Roses"
    },

    {
        id: 1678,
        title: 'A Night at the Opera',
        artist: 'Queen'
    },

    {
        id: 2975,
        title: '1999',
        artist: 'Prince'
    },

    {
        id: 3257,
        title: 'Space Oddity',
        artist: 'DavidBowie'
    }

];

//return an album that matches the id
function findById(id) {
    return albums.find(album => album.id === id);
}

//To do: implement save(album)
function save(album) {
    albums.push(album)
}

//To do: implement findByArtist(artist)
function findByArtist(artist) {
    return albums.filter(album => album.artist === artist);
}

//To do: implement updateById(id, album)
function updateById(id, album) {
    for (let i of albums) {
        if (i.id == id) {
            i.album = album
            return true
        }
    }
    return false
}

//To do: implement removeById(id)
function removeById(id) {
    for (i = 0; i < albums.length ; i++) {
        if (albums[i].id == id) {
            albums.splice(i,1)
            return true
        }
    }
    return false
}

//To do: uncomment the following testing code when you are ready to test your functions

console.log("Part 1")
save({ id: 1458, title: "G N' R Lies", artist: "Guns N' Roses" });
save({ id: 3590, title: "School's Out", artist: 'Alice Cooper' });
save({ id: 1257, title: 'Transformer', artist: 'Lou Reed' });
console.log(albums);

console.log("---------------------------------------------------")
console.log("Part 2")
console.log(findByArtist("Guns N' Roses"));

console.log("---------------------------------------------------")
console.log("Part 3")
console.log(updateById(4000, {}));
console.log(updateById(3257, {
     id: 3257,
     title: 'Space Oddity',
     artist: 'David Bowie'
}));
console.log(albums);

console.log("---------------------------------------------------")
console.log("Part 4")
console.log(removeById(4000));
console.log(removeById(1678));
console.log(albums);