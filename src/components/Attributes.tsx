import React from 'react';
import { IAttributeProps } from '../types/types';

const Attributes = (props: IAttributeProps): JSX.Element => {

    const {
        data,
        feature
    } = props

    function onSubmitClick() {
        //on form submit
        console.log("clicked submit")
    }


    return (
        <>
            <div className="output">
                <form
                    className="form"
                    onSubmit={onSubmitClick}
                >
                    {data !== null ?
                        data.map((item: any, index: number) => {
                            if (item[0] !== "geometry" && item[0] !== "id") {
                                return (
                                    <div key={index}>
                                        <label>{item[0]}: </label>
                                        <br></br>
                                        <input
                                            id={item[0]}
                                            type="text"
                                            name={item[0]}
                                            value={feature && feature?.get(item[0])}
                                            onChange={(changeEvent: any) => {
                                                if (feature) {
                                                    feature.set(item[0], changeEvent.target.value)
                                                }
                                            }}
                                        />
                                        <hr></hr>
                                    </div>
                                );
                            } else if (item[0] === "id") {
                                return (
                                    <div key={index}>
                                        <label>{item[0]}: </label>
                                        <br></br>
                                        <input
                                            id={item[0]}
                                            type="text"
                                            name={item[0]}
                                            value={feature && feature?.get(item[0])}
                                            disabled
                                        />
                                        <hr></hr>
                                    </div>
                                )
                            }
                        })
                        :
                        <p>Activate Select and click feature to display its properties.</p>

                    }
                </form>
            </div>
        </>
    )
}


export default Attributes;

