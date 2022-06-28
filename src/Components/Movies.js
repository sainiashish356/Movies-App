import { movies } from "./getMovies";
import React, { Component } from 'react'

export default class Movies extends Component {
  constructor(){
    super();
     this.state={
      hover: '',
      parr:[1],
     }
  }

  render() {
    let movie = movies.results;
    return (
      <>
        {
            movie.length == 0 ?
            <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
                </div> : 
                <div>
                    <h3 className="text-center"><strong>Trending</strong></h3>
                    <div className="movies-list">
                        {
                            movie.map((movObj) => (
                                <div className="card movies-card" onMouseEnter={() => this.setState({hover:movObj.id})} onMouseLeave={() => this.setState({hover: ''})}>
                                <img src={`https://image.tmdb.org/t/p/original${movObj.backdrop_path}`} class="card-img-top banner-img movies-img" alt={movObj.title} />
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
                              <a class="page-link">Previous</a>
                              {
                                this.state.parr.map((value) => (
                                  <li class="page-item disabled"> <a class="page-link" href="#">{value}</a> </li>
                                ))
                              }
                               
                                <li class="page-item">
                                  <a class="page-link" href="#">Next</a>
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
