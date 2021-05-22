import React, { useState, useReducer, useEffect } from 'react';

export default props => {
  const { className, fieldName, setFieldValue, blocks, exclusive, merge, otherOptions, noneOptions } = props.options;
  const [numSelect, setNumSelect] = useState(0);

  const initialState = props.options.fieldValue || {};
  useEffect(() => {
    if (!exclusive && noneOptions) {
      let keys = Object.keys(initialState);
      if (initialState[noneOptions['name']]) setNumSelect(0);
      else setNumSelect(Object.values(initialState).reduce((accumulator, currentValue) => parseInt(accumulator) + (parseInt(currentValue) || 0), 0))
    }
  }, [])

  const blockList = [];
  const specialBlockList = [];

  const handleToggle = block => {
    if (blockValues[block]) {
      setBlockValues({ [block]: 0 });
      if (block === 'Other') setBlockValues({ ['Other-Text']: '' });
      if (noneOptions && (block !== noneOptions['name'])) setNumSelect(numSelect - 1);
    } else {
      setBlockValues({ [block]: 1 });
      if (noneOptions && (block !== noneOptions['name'])) setNumSelect(numSelect + 1);
    }
  }
  const handleOtherText = e => setBlockValues({ ['Other-Text']: e.currentTarget.value});
  const handleSetExclusive = block => {
    setBlockValues({ ['exclusive']: block })
    if (otherOptions && (block !== 'Other')) setBlockValues({ ['Other-Text']: '' });
  };

  const [blockValues, setBlockValues] = useReducer(
    (curVals, newVals) => ({ ...curVals, ...newVals }), initialState
  );

  useEffect(() => setFieldValue(fieldName, blockValues), [blockValues]);

  if (blocks) {
    for (let i = 0; i < blocks.length; i++) {
      if (exclusive) {
        blockList.push(
          <button key={'block' + i}
            className={'block' + (blockValues['exclusive'] === blocks[i] ? ' selected' : '')}
            onClick={() => handleSetExclusive(blocks[i])}>
            {blocks[i]}
          </button>
        )
      } else {
        blockList.push(
          <button key={'block' + i} disabled={noneOptions && blockValues[noneOptions['name']]}
            className={'block' + (blockValues[blocks[i]] ? ' selected' : '') + (noneOptions && blockValues[noneOptions['name']] ? ' disabled' : '')}
            onClick={() => handleToggle(blocks[i])}>
            {blocks[i]}
          </button>
        )
      }
    }
  }
  if (otherOptions) {
    if (exclusive) {
      specialBlockList.push(
        <button key={'sblock-other'}
          className={'block' + (blockValues['exclusive'] === otherOptions['name'] ? ' selected' : '')}
          onClick={() => handleSetExclusive(otherOptions['name'])}>
          {otherOptions['name']}
        </button>
      )
    } else {
      specialBlockList.push(
        <button key={'sblock-other'} disabled={noneOptions && blockValues[noneOptions['name']]}
          className={'block' + (blockValues[otherOptions['name']] ? ' selected' : '') + (noneOptions && blockValues[noneOptions['name']] ? ' disabled' : '')}
          onClick={() => handleToggle(otherOptions['name'])}>
          {otherOptions['name']}
        </button>
      )
    }
  }
  if (noneOptions) {
    if (exclusive) {
      specialBlockList.push(
        <button key={'sblock-none'} className={'block' + (blockValues['exclusive'] === noneOptions['name'] ? ' selected' : '')}
          onClick={() => handleSetExclusive(noneOptions['name'])}>
          {noneOptions['name']}
        </button>
      )
    } else {
      specialBlockList.push(
        <button key={'sblock-none'} className={'block' + (blockValues[noneOptions['name']] ? ' selected' : '') + (numSelect > 0 ? ' disabled' : '')} disabled={numSelect > 0}
          onClick={() => handleToggle(noneOptions['name'])}>
          {noneOptions['name']}
        </button>
      )
    }
  }

  return <div className={'block-selection-container' + (className ? ' ' + className : '') + (merge ? ' merge' : '')}>
    <div className={'block-wrapper' + (merge ? ' merge' : '')}>
      {blockList}
      {specialBlockList}
    </div>
    {otherOptions && (exclusive ? (blockValues['exclusive'] === otherOptions['name']) : blockValues[otherOptions['name']]) ? <label className='txt-specify conditional w-full'>Please specify:
      <input type='text' name='Other-Text' value={blockValues['Other-Text'] || ''} placeholder={otherOptions['placeholder']}
        onChange={e => handleOtherText(e)} />
    </label> : ''}
  </div>
}
