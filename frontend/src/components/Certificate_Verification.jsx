import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCertificateByNftId } from '../actions/exampleAction';
import { getCertificateFailed } from '../actions/exampleAction';

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
    return (
        <main className="height100per">
            <div className="container-fluid height100per pt-3 ps-4">
                <div className="scrolldiv">
                    <div className="row fadein">
                        <div div className="col-sm-12 text-start">
                            <div className="row">
                                <div className="col-12 text-center">
                                    <div className="backgroundblur">
                                        {viewCertificate ? (
                                            <div className="ctemp height100per">
                                                <label htmlFor="cert-1">
                                                    <p className="text-end w-100 mb-3">
                                                        #{certificate.nftId}
                                                    </p>
                                                    <embed
                                                        src={
                                                            certificate.certificateHash
                                                        }
                                                    />
                                                    <div className="row align-items-center">
                                                        <div className="col-md-7 text-start">
                                                            <p className="mt-3 mb-2">
                                                                Issued on{' '}
                                                                <span>
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
                                                                {
                                                                    certificate
                                                                        .org[
                                                                        'name'
                                                                    ]
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="col-md-5 text-end">
                                                            <span className="eva-hover d-inline-flex align-items-center">
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
                                        ) : (
                                            <VerificationFrom
                                                erroMessage={erroMessage}
                                                handleInputChange={
                                                    handleInputChange
                                                }
                                                handleSubmit={handleSubmit}
                                                isLoading={isLoading}
                                                nftId={nftId}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
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
        <div className="searchform border-none d-block">
            <form onSubmit={handleSubmit}>
                <div className="formscroldiv">
                    {erroMessage && (
                        <div
                            class="alert alert-danger text-center col-sm-6 mx-auto py-3"
                            role="alert"
                        >
                            {erroMessage}
                        </div>
                    )}
                    <div className="row align-items-cente">
                        <div className="col-12 text-center">
                            <div className="fom-container">
                                <label className="mb-2">NFT ID</label>
                                <input
                                    name="nftId"
                                    type={'text'}
                                    value={nftId}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="NFT ID"
                                />
                            </div>
                        </div>
                    </div>
                    <hr className="light-brd" />
                    <div className="row align-items-center">
                        <div className="col-12 text-center">
                            <div className="btngrouprht">
                                {isLoading ? (
                                    <img
                                        src={require('../assets/images/certifi-loader.gif')}
                                        loading="lazy"
                                        alt="Loading..."
                                    />
                                ) : (
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-icon icon-rht"
                                    >
                                        Verifiy
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
