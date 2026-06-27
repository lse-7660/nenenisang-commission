'use client';

import RadioButton from '@/components/common/RadioButton';
import {
    setCharCount,
    setColorType,
    setCoverage,
    setDiscountCount,
    setHasProps,
    setIsPrivate,
    setLicenseType,
} from '@/store/features/infoSlice';
import { RootState } from '@/store/store';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
    const dispatch = useDispatch();
    const { colorType, charCount, coverage, hasProps, licenseType, isPrivate, discountCount, totalEstimate } =
        useSelector((state: RootState) => state.info);

    function formatPrice(number: number) {
        const str = String(number);
        return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    const colorTypeList = [
        { index: 'full-color', buttonName: '풀채색' },
        { index: 'simple-color', buttonName: '간단채색' },
        { index: 'rough-sketch', buttonName: '단색 낙서' },
    ] as const;
    const coverageList = [
        { index: 'half', buttonName: '흉상/반신' },
        { index: 'full-body', buttonName: '전신' },
    ] as const;
    const licenseTypeList = [
        { index: 'personal', buttonName: '비상업용' },
        { index: 'commercial', buttonName: '상업용' },
        { index: 'print', buttonName: '인쇄용' },
    ] as const;

    // style
    const sectionTitleStyle = 'text-xl font-bold mb-1';
    const sectionSubStyle = 'text-sm font-light text-zinc-600 mb-6';

    return (
        <div>
            <div className="main-page py-5 px-4 flex flex-col gap-4">
                <div className="section-colortype section-layout">
                    <h2 className={sectionTitleStyle}>Q1. 컬러 타입</h2>
                    <p className={sectionSubStyle}>
                        {colorType === 'full-color'
                            ? '밑색과 명암, 효과 등이 포함되는 디테일한 채색 타입입니다.'
                            : colorType === 'simple-color'
                              ? '선화로 디테일을 표현하며, 밑색만 포함되는 채색 타입입니다.'
                              : '간단한 스케치를 단색으로 채우는 빠른 낙서 타입입니다.'}
                    </p>

                    <div className="radio-section">
                        {colorTypeList.map((item, idx) => (
                            <RadioButton
                                key={idx}
                                buttonName={item.buttonName}
                                itemIndex={item.index}
                                currentSelected={colorType}
                                onClick={() => dispatch(setColorType(item.index))}
                            />
                        ))}
                    </div>
                </div>
                <div className="section-charnum section-layout">
                    <h2 className={sectionTitleStyle}>Q2. 캐릭터 수</h2>
                    <p className={sectionSubStyle}>기본 1인이며, 3명까지 선택할 수 있습니다.</p>
                    <div className="flex flex-row">
                        <input
                            type="number"
                            value={charCount}
                            className="w-full px-4 py-2 border border-zinc-400 rounded-xl"
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val === '') {
                                    return;
                                }
                                const num = Number(val);
                                if (num >= 1 && num <= 3) {
                                    dispatch(setCharCount(num));
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="section-coverage section-layout">
                    <h2 className={sectionTitleStyle}>Q3. 노출 범위</h2>
                    <p className={sectionSubStyle}>
                        {coverage === 'half'
                            ? '캐릭터의 머리부터 골반까지 포함합니다.'
                            : '캐릭터의 머리부터 허벅지, 또는 전신을 포함합니다.'}
                    </p>
                    <div className="radio-section">
                        {coverageList.map((item, idx) => (
                            <RadioButton
                                key={idx}
                                buttonName={item.buttonName}
                                itemIndex={item.index}
                                currentSelected={coverage}
                                onClick={() => dispatch(setCoverage(item.index))}
                            />
                        ))}
                    </div>
                </div>
                <div className="section-props section-layout">
                    <h2 className={sectionTitleStyle}>Q4. 소품 여부</h2>
                    <p className={sectionSubStyle}>무기 및 소품이 있을 경우 추가금이 발생합니다.</p>
                    <div className="radio-section">
                        <RadioButton
                            buttonName={'소품 없음'}
                            itemIndex={false}
                            currentSelected={hasProps}
                            onClick={() => dispatch(setHasProps(false))}
                        />
                        <RadioButton
                            buttonName={'소품 있음'}
                            itemIndex={true}
                            currentSelected={hasProps}
                            onClick={() => dispatch(setHasProps(true))}
                        />
                    </div>
                </div>
                <div className="section-lisencetype section-layout">
                    <h2 className={sectionTitleStyle}>Q5. 작업물 용도</h2>
                    <p className={sectionSubStyle}>
                        {licenseType === 'personal'
                            ? '비상업적 용도로 개인 SNS에 게시하거나 커뮤니티 등에서 사용 가능합니다.'
                            : licenseType === 'commercial'
                              ? '유튜브ㆍ생일 카페 배포용 굿즈 등에 해당합니다.'
                              : '개인 굿즈 제작과 같은 비상업적 용도의 인쇄물로 사용 가능합니다.'}
                    </p>
                    <div className="radio-section">
                        {licenseTypeList.map((item, idx) => (
                            <RadioButton
                                key={idx}
                                buttonName={item.buttonName}
                                itemIndex={item.index}
                                currentSelected={licenseType}
                                onClick={() => dispatch(setLicenseType(item.index))}
                            />
                        ))}
                    </div>
                </div>
                <div className="section-private section-layout">
                    <h2 className={sectionTitleStyle}>Q6. 작업물 샘플 공개</h2>
                    <p className={sectionSubStyle}>작업물 비공개를 선택하실 경우, 전체 금액의 10%가 추가됩니다.</p>
                    <div className="radio-section">
                        <RadioButton
                            buttonName={'공개'}
                            itemIndex={false}
                            currentSelected={isPrivate}
                            onClick={() => dispatch(setIsPrivate(false))}
                        />
                        <RadioButton
                            buttonName={'비공개'}
                            itemIndex={true}
                            currentSelected={isPrivate}
                            onClick={() => dispatch(setIsPrivate(true))}
                        />
                    </div>
                </div>
                <div className="section-discount section-layout">
                    <h2 className={sectionTitleStyle}>Q7. 여성 캐릭터 수</h2>
                    <p className={sectionSubStyle}>
                        {colorType === 'rough-sketch'
                            ? '단색 낙서 타입의 경우 여성 캐릭터 할인이 적용되지 않습니다.'
                            : '여성 캐릭터가 포함된 경우 금액이 할인됩니다.'}
                    </p>
                    <div>
                        <input
                            disabled={colorType === 'rough-sketch'}
                            type="number"
                            value={discountCount}
                            className="w-full px-4 py-2 border border-zinc-400 rounded-xl"
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val === '') {
                                    return;
                                }
                                const num = Number(val);
                                if (num >= 0 && num <= charCount) {
                                    dispatch(setDiscountCount(num));
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="notice text-sm leading-1.2 font-light">
                    본 견적은 임시 견적으로, 신청서에 작성된 캐릭터 디자인과 구도 등에 따라 할인되거나 추가금이 발생할
                    수 있습니다.
                </div>
                <a
                    href={
                        colorType === 'full-color'
                            ? 'https://kre.pe/xymE'
                            : colorType === 'simple-color'
                              ? 'https://kre.pe/nq1z'
                              : 'https://kre.pe/vWAo'
                    }
                    target="_blank"
                    className="w-full py-4 px-8 my-2 flex flex-row items-center justify-between rounded-full text-xl font-medium text-white bg-indigo-500 "
                >
                    커미션 신청하기 <ChevronRightIcon className="size-8" />
                </a>
            </div>
            {/* 총 합계 */}
            <div className="section-total-estimate sticky bottom-0 w-full max-width-2xl flex flex-row justify-between items-center px-4 py-6 rounded-t-2xl bg-zinc-900 text-white">
                <div className="text-xl">합계</div>
                <div className="font-bold text-4xl">{formatPrice(totalEstimate)}원</div>
            </div>
        </div>
    );
}
