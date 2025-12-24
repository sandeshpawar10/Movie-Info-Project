document.addEventListener("DOMContentLoaded", function(){
    let movie = document.querySelector('#text')
    let year = document.getElementById('year')
    let options = document.getElementById('options')
    let btn = document.getElementById('searchbtn')
    let poster = document.querySelector('.poster')
    let title = document.querySelector('#title')
    let overview = document.querySelector('#overview')
    let director = document.querySelector('#director')
    let castlist = document.querySelector('#cast')
    let mc = document.querySelector('#mc')
    let mcs = document.querySelector('#mcs')
    let rating  = document.querySelector('#rating')
    let releasedate = document.getElementById('releasedate')

    btn.addEventListener("click",function(){
        // let moviename = movie.value
        let moviename = movie.value.trim();
        let movieyear = year.value.trim();
        let movietype = options.value;
        if (moviename === "") {
            alert("Please enter a movie name!");
            return;
        }
        console.log(moviename,movieyear,movietype)
        fetchdata(moviename,movieyear,movietype);
    })

    async function fetchdata(moviename,movieyear,movietype){
        let url = `https://api.themoviedb.org/3/search/movie?api_key=76a59e1b0f2db9023d2c6c6be103c289&query=${moviename}`
        if(movieyear){
            url = url+`&year=${movieyear}`
        }
        // if (movietype === "bollywood") {
        //     url += "&region=IN&language=hi";
        // }
        // else if (movietype === "hollywood") {
        //     url += "&region=US&language=en";
        // }
        try{
            btn.textContent = "Searching..."
            btn.disabled = true
            let response  = await fetch(url)
            if(!response.ok){
                throw new Error("Data is not available")
            }
            let mydata = await response.json()
            if (!mydata.results || mydata.results.length === 0) {
                alert("❌ Movie not found!");
                return;
            }
            console.log(mydata);
            if(movietype==='bollywood'){
                let lanmovie = ["hi", "te", "ta", "ml", "kn", "mr", "bn", "gu", "pa"]
                mydata.results = mydata.results.filter(m => lanmovie.includes(m.original_language));
            }
            else if(movietype==='hollywood'){
                const hollywoodLangs = ["en", "fr", "es", "de", "it", "pt", "nl", "sv", "no", "da", "fi", "ru", "pl", "tr", "cs", "hu", "ro", "el", "he", "is"];
                mydata.results = mydata.results.filter(m1 => hollywoodLangs.includes(m1.original_language));
            }
            if (mydata.results.length === 0) {
                alert("❌ No movies found matching selected type!");
                return;
            }

            let movieid = mydata.results[0].id;
            
            let idurl = `https://api.themoviedb.org/3/movie/${movieid}/credits?api_key=76a59e1b0f2db9023d2c6c6be103c289`;
            let response1 = await fetch(idurl)
            if(!response1.ok){
                throw new Error("Data is not available")
            }
            let myiddata = await response1.json()
            console.log(myiddata)

            // director = myiddata.crew[0].name;
            // castlist = myiddata.cast.slice(0,5).map(actor => //it means i want cast which is at top 5 and i want only names
            //     actor.name
            // )

            // console.log(director);
            // console.log(castlist);
            // let alldata = mydata+myiddata;
            // console.log(alldata);
            let combineddata = {
                p: mydata.results[0].poster_path,
                t: mydata.results[0].title,
                d: myiddata.crew[0].name,
                c: myiddata.cast.slice(0,5).map(actor => //it means i want cast which is at top 5 and i want only names
                    actor.name
                ),
                o: mydata.results[0].overview,
                r: mydata.results[0].vote_average,
                release: mydata.results[0].release_date
            }
            console.log(combineddata);
            displaydata(combineddata);

        }
        catch(error){
            alert("Movie Not Found")
        }
        finally{
            btn.textContent = "Search"
            btn.disabled = false
        }
        // displaydata(poster,title,overview,director,cast,rating);
    }

    function displaydata(moviedata){
        title.innerHTML = "<b>Title:</b> " + moviedata.t
        overview.innerHTML = "<b>Description:</b>  " + moviedata.o
        director.innerHTML = "<b>Director:</b>  " + moviedata.d
        castlist.innerHTML = "<b>Casts:</b>  " + moviedata.c.join(", ")
        releasedate.innerHTML = "<b>Release Date:</b>  " +moviedata.release
        rating.innerHTML = "<b>IMDB:</b>  " + moviedata.r
        if(poster){
            poster.src= `https://image.tmdb.org/t/p/w400${moviedata.p}`;
            poster.style.display = "block"; // show it
        }
        else{
            poster.src = "https://via.placeholder.com/300x450?text=No+Image";
            poster.style.display = "block"; // show it
        }
    }
})