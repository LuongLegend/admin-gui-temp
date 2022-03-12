import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const index = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    useEffect(() => {
        const code = searchParams.get('code');
        if (code) {
            localStorage.setItem('gg_code', code);
            navigate('/concept');
        }
    }, []);
    return <div></div>;
};

export default index;
