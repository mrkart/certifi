import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCertificateByNftId } from '../actions/exampleAction';
import { getCertificateFailed } from '../actions/exampleAction';
import * as eva from 'eva-icons';

export default function CertificateVerification() {
    const [viewCertificate, setViewCertificate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [nftId, setNftId] = useState('');
    const [erroMessage, setErroMessage] = useState('');
    const [certificate, setCertifcate] = useState({});

    const dispatch = useDispatch();
    const getFailed = useSelector(
        (state) => state.demoReducer.getCertificateFailed
    );
    const getSucceeded = useSelector(
        (state) => state.demoReducer.getCertificate
    );

    useEffect(() => {
        if (
            getFailed &&
            typeof getFailed === 'string' &&
            getFailed.length > 0
        ) {
            dispatch(getCertificateFailed());
            setIsLoading(false);
            setViewCertificate(false);
            setErroMessage(getFailed);
        }
        setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getFailed]);

    useEffect(() => {
        if (getSucceeded.statusCode === 200) {
            console.log('getSucceeded', getSucceeded);
            setCertifcate({
                ...getSucceeded.data.certificate,
            });
            setIsLoading(false);
            setViewCertificate(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getSucceeded]);

    function handleSubmit(event) {
        setErroMessage('');
        event.preventDefault();
        if (!nftId) {
            setErroMessage('Please fill out all required fields');
            return;
        }
        setIsLoading(true);
        dispatch(getCertificateByNftId(nftId));
    }

    function handleInputChange(event) {
        const { value } = event.target;
        setNftId(value);
    }
    useEffect(() => { eva.replace() });
    return (
        <div className="container-fluid height100per">              
            <div className="row fadein align-items-center justify-conten-center h-100">
                <div div className="col-md-6 offset-md-3 text-start">
                <div className="backgroundblur p-3 my-3">

                            <VerificationFrom
                                        erroMessage={erroMessage}
                                        handleInputChange={
                                            handleInputChange
                                        }
                                        handleSubmit={handleSubmit}
                                        isLoading={isLoading}
                                        nftId={nftId}
                                    />

                           </div>
                           {viewCertificate ? (
                           <div className="backgroundblur p-3 mb-3">
        
                               
                                   
                                    <div className="ctemp height100per mb-0">
                                        <label htmlFor="cert-1" className='w-100'>
                                            <p className="text-end w-100 mb-3">
                                                #{certificate.nftId}
                                            </p>
                                            <embed className='iframe'
                                                src={
                                                    certificate.certificateHash
                                                }
                                            />
                                            <div className="row align-items-center">
                                                <div className="col-md-7 text-start">
                                                    <p className="mt-3 mb-2">
                                                        Issued on{' '}
                                                        <span className='fw-bold'>
                                                            {new Date(
                                                                certificate.datetimeCreated
                                                            ).toLocaleDateString(
                                                                'en-US',
                                                                {
                                                                    year: 'numeric',
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                }
                                                            )}
                                                        </span>
                                                    </p>
                                                    <p className="">
                                                        by{' '}
                                                        <span className='fw-bold text-primary'>{
                                                            certificate.org[
                                                            'name'
                                                            ]
                                                        }
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className="col-md-5 text-end">
                                                    <span className="eva-hover d-inline-flex align-items-center text-primary">
                                                        <i
                                                            className="mr-2"
                                                            data-eva="share-outline"
                                                            data-eva-animation="flip"
                                                        ></i>{' '}
                                                        Share
                                                    </span>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                            </div>
                            ) : (''
                                    
                            )}
                </div>
            </div>

        </div>
    );
}

export function VerificationFrom({
    erroMessage,
    handleInputChange,
    handleSubmit,
    isLoading,
    nftId,
}) {
    return (
        <div className="searchform border-none d-block p-0">
            <form onSubmit={handleSubmit}>
                <div className="fom-group">
                    <label className="mb-2 fw-bold">NFT ID</label>
                    <div class="input-group mb-3 inputbtngroup">
                        <input name="nftId" type={'text'} value={nftId} onChange={handleInputChange} className="form-control" placeholder="NFT ID" />
                        <button type="submit" className="btn btn-primary btn-icon">Verifiy                         
                        {isLoading ? (
                                <span className='loaderbtn fadein'>
                                <img
                                    src={require('../assets/images/certifi-loader.gif')}
                                    loading="lazy"
                                    alt="Loading..."
                                />
                                </span>
                            ) : ''}</button>
                    </div>                   
                </div>                
                {erroMessage && (
                    <div class="alert alert-danger text-center col-sm-6 mx-auto fadein" role="alert">{erroMessage}</div>
                )}
            </form>
        </div>
    );
}
