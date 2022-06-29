// import { movies } from "./getMovies";
import React, { Component } from 'react';
import axios from "axios";

export default class Movies extends Component {
  constructor(){
    super();
     this.state={
      hover: '',
      parr:[1],
      currPage: 1,
      movies:[],
     }
  }

  async componentDidMount(){
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5441569e0ccf4e14443bf3081bd0d48f&language=en-US&page=${this.state.currPage}`);
    let data = res.data;

    this.setState({
      movies:[...data.results]
    })
    console.log(data);
  }

  changeMovies = async () => {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5441569e0ccf4e14443bf3081bd0d48f&language=en-US&page=${this.state.currPage}`);
    let data = res.data;

    this.setState({
      movies:[...data.results]
    })
  }

  handleRight =() => {
    let temparr = [];
    for(let i = 1;i <= this.state.parr.length+1;i++){
      temparr.push(i);
    }
    this.setState({
      parr:[...temparr],
      currPage:this.state.currPage+1,
    } , this.changeMovies)
  }
   
  handlePrev = () => {
   if(this.state.currPage != 1){
    this.setState({
        currPage: this.state.currPage-1
    } , this.changeMovies)
   }
  }

  handleClick = (value) => {
    if(value != this.state.currPage){
      this.setState({
        currPage: value
      } , this.changeMovies)
    }

  }


  render() {
    // let movie = movies.results;
    return (
      <>
        {
            this.state.movies.length == 0 ?
            <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
                </div> : 
                <div>
                    <h3 className="text-center"><strong>Trending</strong></h3>
                    <div className="movies-list">
                        {
                            this.state.movies.map((movObj) => (
                                <div className="card movies-card" onMouseEnter={() => this.setState({hover:movObj.id})} onMouseLeave={() => this.setState({hover: ''})}>
                                <img src={`https://image.tmdb.org/t/p/original${movObj.backdrop_path}`} className="card-img-top banner-img movies-img" alt={movObj.title} />
                                {/* <div className="card-body"> */}
                                    <h4 className="card-title movies-title">{movObj.original_title}</h4>
                                    {/* <p className="card-text movies-text"> {movObj.overview}</p> */}
                                    <div className="btn-wrapper" style={{display: 'flex' , justifyContent:'center'}}>
                                    {
                                      this.state.hover === movObj.id &&
                                      <a href="#" className="btn btn-primary movies-button"> Add to favourites </a>
                                     
                                    }
                                    </div>
                                   
                                {/* </div> */}
                                </div>
                            ) )
                        }
                    </div>
                    {/* pagination */}
                         <div style={{justifyContent:'center' , display:'flex'}}>
                              <nav aria-label="...">
                              <ul class="pagination">
                              <a className="page-link prev-btn" onClick={this.handlePrev}>Previous</a>
                              {
                                    this.state.parr.map((value)=>(
                                        <li class="page-item"><a class="page-link" onClick={()=>this.handleClick(value)}>{value}</a></li>
                                    ))
                                }
                               
                                <li class="page-item">
                                  <a className="page-link nxt-btn" onClick={this.handleRight}>Next</a>
                                </li>
                              </ul>
                            </nav>
                         </div> 

                </div>
                
              }
      </>
    )
  }
}
