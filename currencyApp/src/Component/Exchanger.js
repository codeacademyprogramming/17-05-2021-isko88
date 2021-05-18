import { createRef } from "react";
import datajson from "./rates.json";

export default function Exchanger() {
  const curFromValRef = createRef();
  const curFromRef = createRef();
  const curToRef = createRef();
  const resRef = createRef();

  function exchange(){
    const fromRef = curFromRef.current.value;
    const toRef = curToRef.current.value;
    const result = getValOfCurCode(fromRef, toRef);
    resRef.current.value = result.toFixed(2);
  };

  function getValOfCurCode (from, to) {
    const curFrom = datajson.find((cur) => cur.code === from).value;
    const curTo = datajson.find((cur) => cur.code === to).value;
    const fromValRef = curFromValRef.current.value;
    return (curFrom / curTo) * fromValRef;
  };

  function changeCurr () {
    [
     curFromRef.current.value,
     curToRef.current.value
    ] 
    = 
    [
      curToRef.current.value,
      curFromRef.current.value,
    ];
    exchange();
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-3 ">
        <div className="exchanger">
          <div className="row">
            <div>
              <label>From</label>
              <div className="d-flex justify-content-between">
                <input defaultValue="1" ref={curFromValRef} />
                <select ref={curFromRef} defaultValue="USD">
                  {datajson.map((cr, key) => (
                    <option value={cr.code} key={key}>
                      {cr.code}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="my-3 d-flex justify-content-around">
              <img
                src={`${process.env.PUBLIC_URL}/switch.png`}
                onClick={changeCurr}
              />
            </div>
            <div>
              <label>To</label>
              <div className="d-flex justify-content-between">
                <input disabled ref={resRef} defaultValue="1.70" />
                <select ref={curToRef} defaultValue="AZN">
                  {datajson.map((cr, key) => (
                    <option value={cr.code} key={key}>
                      {cr.code}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <button className="exchange mt-4" onClick={exchange}>
          Exchange
        </button>
      </div>
    </div>
  );
}
