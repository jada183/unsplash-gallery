import "./home.css";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
    const [searchValue, setNewSearchValue] = useState('');
    const [imageList, setImageList] = useState([]);
    const [pages, setPages] = useState(1);
    useEffect((searchValue, pages) => {
        getImages(searchValue, pages, false);
    }, []);
    const fetchMoreData = () => {
        setPages(pages + 1 );
        getImages(searchValue, pages, true)
    }
    const addImageToList = (response) => {
        const imageListIncreased = imageList.concat(response);
        console.log('imageListIncreased', imageListIncreased);
        setImageList(imageListIncreased);
    }
    const managePhotoResponse = (response,infiteScroll) => {
        console.log('managePhotoResponse', infiteScroll);
        if(infiteScroll) {
            addImageToList(response);
        } else {
            setImageList(response);
        }
    }
    const getImages = (searchValue, pages, infiteScroll) => {
        const parameters = {
            query: searchValue,
            pages: pages,
            per_page: 10
        };
        if (searchValue) {
            return axios({
                method: "GET",
                url: "https://api.unsplash.com/search/photos",
                params: parameters
            })
                .then(response => {
                    console.log(response);
                    return response.data.results})
                .then(response => {
                   managePhotoResponse(response, infiteScroll) 
                    
                })
        } else {
            return axios({
                method: "GET",
                url: "https://api.unsplash.com/photos",
                params: parameters
            })
                .then(response => response.data)
                .then(response => {
                    managePhotoResponse(response, infiteScroll);
                })
        }
    };
    return (
        <div className="container">

            <div className="row mb-3 text-center">
                <h1>BUSCADOR DE IMAGENES.</h1>
            </div>
            <form>
                <div className="row text-center mb-2">
                    <div className="">
                        <input type="text"
                            id="search-text"
                            className="form-control"
                            placeholder="Añade un filtro de busqueda"
                            value={searchValue}
                            onChange={e => setNewSearchValue(e.target.value)}
                        />
                    </div>

                </div>
                <div className="row text-center col-4 offset-4 mb-3 mt-3">
                    <button onClick={() => getImages(searchValue, pages, false)} type="button" className="btn btn-primary">Buscar</button>
                </div>
            </form>
            <InfiniteScroll
                dataLength={imageList.length}
                next={() => fetchMoreData()}
                hasMore={true}
            >
                {imageList.map(({
                    id, urls, alt_description
                }, index) => (
                    <div className="text-center mb-3" key={index + id}>
                        <img src={urls.small} alt={alt_description} />
                    </div>
                ))}
            </InfiniteScroll>
        </div>

    )
};
export default Home;

