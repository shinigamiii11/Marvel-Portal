import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import AppBanner from '../appBanner/AppBanner';


const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {loading, error, getSingleComic, getCharacter, clearError} = useMarvelService();


    useEffect(() => {
        updateData();
    }, [id]);

    
    const updateData = () => {
        clearError();

        switch (dataType) {
            case 'comic':
                getSingleComic(id)
                .then(onDataLoaded);
                break;
            case 'character':
                getCharacter(id)
                .then(onDataLoaded);
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

   
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !data) ? <Component data={data}/> : null;

    return (
        <>
        <AppBanner/>
        {errorMessage}
        {spinner}
        {content}
        </>
    )
}


export default SinglePage;