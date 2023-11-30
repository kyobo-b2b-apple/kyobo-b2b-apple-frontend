import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

const KakaoPostCode = () => {

    const [openPostcode, setOpenPostcode] = useState<boolean>(false);

    const handle = {

        clickButton: () => {
            setOpenPostcode(current => !current);
        },


        selectAddress: (data: any) => {
            console.log(`
                    주소: ${data.address},
                    우편번호: ${data.zonecode}
                `);
            setOpenPostcode(false);
        },
    };

    return (
        <div>
            <button onClick={handle.clickButton}>toggle</button>

            {openPostcode &&
                <DaumPostcode
                    onComplete={handle.selectAddress}
                    autoClose={false}
                    defaultQuery='판교역로 235'
                />}
        </div>
    );
};

export default KakaoPostCode;