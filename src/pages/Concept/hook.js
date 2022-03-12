import { useState, useEffect } from 'react';
import { callApi } from '../../utils/callApi';

export const useCat = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [catObj, setCatObj] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        const getCats = async () => {
            const response = await callApi('/cat', 'GET');
            if (response && response.success) {
                const { data } = response;
                setCatObj(data);
            }
            setIsLoading(false);
        };
        getCats();
    }, []);

    return [isLoading, catObj];
};
