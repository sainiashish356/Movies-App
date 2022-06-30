import React, { Component } from 'react';
import { movies } from './getMovies';


export default class Favourite extends Component {
    constructor(){
        super();
        this.state={
            genres:[],
            currgen: 'All Genres',
            movies:[],
            currText: '',
            limit: 5,
            currPage: 1
        }
    }

    componentDidMount(){
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
        let data = JSON.parse(localStorage.getItem('movies') || '[]');
        let temp = [];
        data.forEach((movObj) => {
            if(!temp.includes(genreids[movObj.genre_ids[0]])){
                temp.push(genreids[movObj.genre_ids[0]])
            }
        })
            temp.unshift('All Genres');
            this.setState({
                genres:[...temp],
                movies:[...data]
            })
    }

    handleGenreChange = (genre) => {
        this.setState({
            currgen: genre
        })
    }

    sortPopularityDesc = () => {
        let temp = this.state.movies;
        temp.sort(function(objA , objB){
            return objB.popularity - objA.popularity
        })
        this.setState({
            movies:[...temp]
        })
    }

    sortPopularityAsc = () => {
        let temp = this.state.movies;
        temp.sort(function(objA , objB){
            return objA.popularity - objB.popularity
        })
        this.setState({
            movies:[...temp]
        })
    }

    sortRatingAsc = () => {
        let temp = this.state.movies;
        temp.sort(function(objA , objB){
            return objA.vote_average - objB.vote_average
        })
        this.setState({
            movies:[...temp]
        })
    }

    sortRatingDesc = () => {
        let temp = this.state.movies;
        temp.sort(function(objA , objB){
            return objB.vote_average - objA.vote_average
        })
        this.setState({
            movies:[...temp]
        })
    }

    handlePageChange = (page) => {
        this.setState({
            currPage:page
        })
    }

    handleDelete =(id) => {
        let newArr = [];
        newArr = this.state.movies.filter((movObj) => movObj.id != id)
        this.setState({
            movies:[...newArr]
        })
        localStorage.setItem("movies" , JSON.stringify(newArr))
    }


    render() {
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};

        //filter movies as per their genre
        let filterArr = [];

        if(this.state.currText === ''){
            filterArr = this.state.movies
        }else{
            filterArr = this.state.movies.filter((movObj) => {
                let title = movObj.original_title.toLowerCase();
                return title.includes(this.state.currText.toLowerCase())
            })
        }

        // if(this.setState.currgen == 'All Genres'){
        //     filterArr = this.state.movies
        // }else{
        //     filterArr = this.state.movies.filter((movObj) => genreids[movObj.genre_ids[0]] == this.state.currgen)
        // }

        if(this.setState.currgen != 'All Genres'){
            filterArr = this.state.movies.filter((movObj) => genreids[movObj.genre_ids[0]] == this.state.currgen)
        }

        //pagination logic
        let pages = Math.ceil(filterArr.length/this.state.limit);
        let pagesarr = [];
        for(let i=1;i<=pages;i++){
            pagesarr.push(i);
        }
        let si = (this.state.currPage-1)*this.state.limit;
        let ei = si+this.state.limit;
        filterArr = filterArr.slice(si,ei);


    return (
      <div>
        <>
            <div className='main'>
            <div className='row'>
                <div className='col-lg-3 col-sm-12'>
                <ul class="list-group favourite-genre">
                    {
                        this.state.genres.map((genre) => (
                            this.state.currgen == genre ?
                            <li class="list-group-item" style={{background: '#3f51b5' , color:'white' ,fontWeight:'bold'}}>{genre}</li> :
                            //those are not selected we are writing to fetch details of those genres
                            <li class="list-group-item" style={{background: 'grey' , color:'3f51b5' }} onClick={()=> this.handleGenreChange(genre)}>{genre}</li>

                        ))
                    }
                  
                </ul>
                </div>
                <div className='col-lg-9 favourite-table col-sm-12'>
                {/* 2 inputs */}
                     <div className="row">
                         <input type="text" class="input-group-text col" placeholder='Search' value={this.state.currText} onChange={(e)=> this.setState({currText: e.target.value})}/>
                        <input type="number"  class="input-group-text col" placeholder='Rows Count' value={this.state.limit} onChange={(e) => this.setState({limit:e.target.value})}/>
                     </div>

                        {/* table */}
                     <div className='row'>
                     <table class="table">
                            <thead>
                                <tr>
                                <th scope="col">Tilte</th>
                                <th scope="col">Genre</th>
                                <th scope="col"><i class="fa-solid fa-angle-up" onClick={this.sortPopularityDesc}/> Popularity <i class="fa-solid fa-chevron-down" onClick={this.sortPopularityAsc}/></th>

                                <th scope="col"><i class="fa-solid fa-angle-up" onClick={this.sortRatingDesc}/> Rating <i class="fa-solid fa-chevron-down" onClick={this.sortRatingAsc}/></th>
                                <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                filterArr.map((movObj) => (
                                    <tr>  
                                    <td>  <img src={`https://image.tmdb.org/t/p/original${movObj.backdrop_path}`} style={{width:'5rem'}} alt={movObj.title} /> 
                                    {movObj.original_title}</td>
                                    <td>{genreids[movObj.genre_ids[0]]}</td>
                                    <td>{movObj.popularity}</td>
                                    <td>{movObj.vote_average}  </td>
                                    <td><button type="button" class="btn btn-danger" onClick={() => this.handleDelete(movObj.id)}>Delete</button>  </td>
                                </tr>
                                ))
                            }
                              
                            </tbody>
                            </table>
                     </div>
                          {/* pagination */}
                  <nav aria-label="Page navigation example">
                        <ul class="pagination">
                        {
                       pagesarr.map((page)=>(
                       <li class="page-item"><a class="page-link" onClick={()=>this.handlePageChange(page)}>{page}</a></li>
                            ))
                         }
                        
                    </ul>
                    </nav>
                </div>
            </div>
            </div>
        </>
      </div>
    )
  }
}
