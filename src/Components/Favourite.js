import React, { Component } from 'react';
import { movies } from './getMovies';
import {Movies} from './Movies';

export default class Favourite extends Component {
    constructor(){
        super();
        this.state={
            genres:[],
            currgen: 'All Genres'
        }
    }
    render() {
        const movie = movies.results;
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};

        let temp =[];
        movie.forEach((movObj) => {
            if(!temp.includes(genreids[movObj.genre_ids[0]])){
                temp.push(genreids[movObj.genre_ids[0]])
            }
        })
            temp.unshift('All Genres');

            // this.setState({
            //     genres:[...temp]
            // })

            console.log(temp);

    return (
      <div>
        <>
            <div className='main'>
            <div className='row'>
                <div className='col-3'>
                <ul class="list-group favourite-genre">
                    {
                        temp.map((genre) => (
                            this.state.currgen == genre ?
                            <li class="list-group-item" style={{background: '#3f51b5' , color:'white' ,fontWeight:'bold'}}>{genre}</li> :
                            <li class="list-group-item" style={{background: 'white' , color:'3f51b5' }}>{genre}</li>

                        ))
                    }
                  
                </ul>
                </div>
                <div className='col-9 favourite-table'>
                {/* 2 inputs */}
                     <div className="row">
                         <input type="text" class="input-group-text col" placeholder='Search'/>
                        <input type="number"  class="input-group-text col" placeholder='Rows Count'/>
                     </div>

                        {/* table */}
                     <div className='row'>
                     <table class="table">
                            <thead>
                                <tr>
                                <th scope="col">Tilte</th>
                                <th scope="col">Genre</th>
                                <th scope="col">Popularity</th>
                                <th scope="col">Rating</th>
                                <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                movie.map((movObj) => (
                                    <tr>  
                                    <td>  <img src={`https://image.tmdb.org/t/p/original${movObj.backdrop_path}`} style={{width:'5rem'}} alt={movObj.title} /> 
                                    {movObj.original_title}</td>
                                    <td>{genreids[movObj.genre_ids[0]]}</td>
                                    <td>{movObj.popularity}</td>
                                    <td>{movObj.vote_average}  </td>
                                    <td><button type="button" class="btn btn-danger">Delete</button>  </td>
                                </tr>
                                ))
                            }
                              
                            </tbody>
                            </table>
                     </div>
                          {/* pagination */}
                  <nav aria-label="Page navigation example">
                        <ul class="pagination">
                        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item"><a class="page-link" href="#">Next</a></li>
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
