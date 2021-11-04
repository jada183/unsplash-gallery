import "./home.css";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";


const initialPageState = 1;
const perPageDefault = 10;
const Home = () => {
    const [searchValue, setNewSearchValue] = useState('');
    const [imageList, setImageList] = useState([]);
    const [pages, setPages] = useState(initialPageState);
    useEffect((searchValue, pages) => {
        getImages(searchValue, pages, true, perPageDefault);
    }, [searchValue]);
    // const fetchMoreData = () => {
    //     setPages(pages + 1);
    //     getImages(searchValue, pages, true);
    // }
    const addImageToList = (response) => {
        const imageListIncreased = imageList.concat(response);
        setImageList(imageListIncreased);
    }
    const managePhotoResponse = (response, infiteScroll) => {
        if (infiteScroll) {
            addImageToList(response);
        } else {
            setPages(0);
            window.scroll(0, 0);
            setImageList(response);
        }

    }
    const getImages = (searchValue, pages, infiteScroll, perPage) => {
        const parameters = {
            query: searchValue,
            page: pages,
            per_page: perPage
        };
        if (searchValue) {
            return axios({
                method: "GET",
                url: "https://api.unsplash.com/search/photos",
                params: parameters
            })
                .then(response => response.data.results)
                .then(response => {
                    managePhotoResponse(response, infiteScroll);
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
            <nav className="navbar navbar-expand-sm sticky-top navbar-light bg-light">
                <form className="col-12">
                    <div className="row text-center mb-2">
                        <div className="">
                            <input type="text"
                                id="search-text"
                                className="form-control"
                                placeholder="Añade un filtro de busqueda"
                                value={searchValue}
                                onChange={e => {
                                    setNewSearchValue(e.target.value);

                                }}
                            />
                        </div>
                    </div>
                    <div className="row text-center col-4 offset-4 mb-3 mt-3">
                        <button onClick={() => getImages(searchValue, 1, false, 9)} type="button" className="btn btn-primary">Buscar</button>
                    </div>
                </form>
            </nav>

            <div className="container">
                <div className="row">
                    {/* <InfiniteScroll
                        dataLength={imageList.length}
                        next={() => fetchMoreData()}
                        hasMore={true}
                    > */}
                    {imageList.map(({
                        id, urls, alt_description
                    }, index) => (
                        <div className="text-center mb-3" key={index + id}>
                            <img src={urls.small} alt={alt_description} />
                        </div>
                    ))}
                    {/* </InfiniteScroll> */}
                </div>
            </div>

        </div>
    )
};
export default Home;

