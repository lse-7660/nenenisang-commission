import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface infoState {
    colorType: 'full-color' | 'simple-color' | 'rough-sketch';
    charCount: number;
    coverage: 'half' | 'full-body';
    hasProps: boolean;
    licenseType: 'personal' | 'commercial' | 'print';
    isPrivate: boolean;
    discountCount: number;
    totalEstimate: number;
}

const initialState: infoState = {
    colorType: 'full-color',
    charCount: 1,
    coverage: 'half',
    hasProps: false,
    licenseType: 'personal',
    isPrivate: false,
    discountCount: 0,
    totalEstimate: 40000,
};

const calculateEstimate = (state: infoState) => {
    const PRICE_TABLE = {
        'full-color': {
            basePrice: 40000,
            fullBodyExtra: 20000,
            propsExtra: 10000,
            discountUnit: 10000,
        },
        'simple-color': {
            basePrice: 20000,
            fullBodyExtra: 10000,
            propsExtra: 5000,
            discountUnit: 5000,
        },
        'rough-sketch': {
            basePrice: 10000,
            fullBodyExtra: 10000,
            propsExtra: 5000,
            discountUnit: 0,
        },
    };

    const config = PRICE_TABLE[state.colorType];

    let basePrice = config.basePrice;
    if (state.coverage === 'full-body') {
        basePrice += config.fullBodyExtra;
    }

    let currentTotal = basePrice * state.charCount;

    if (state.hasProps) {
        currentTotal += config.propsExtra;
    }

    if (state.licenseType === 'commercial') currentTotal *= 3;
    if (state.licenseType === 'print') currentTotal *= 1.5;

    if (state.isPrivate) currentTotal *= 1.1;

    currentTotal -= state.discountCount * config.discountUnit;

    state.totalEstimate = Math.max(0, Math.round(currentTotal));
};

export const infoSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {
        // 채색 타입 변경
        setColorType: (state, action: PayloadAction<'full-color' | 'simple-color'>) => {
            state.colorType = action.payload;
            calculateEstimate(state);
        },
        // 캐릭터 수 변경
        setCharCount: (state, action: PayloadAction<number>) => {
            state.charCount = action.payload;
            if (state.discountCount > action.payload) {
                state.discountCount = action.payload;
            }
            calculateEstimate(state);
        },
        setCoverage: (state, action: PayloadAction<'half' | 'full-body'>) => {
            state.coverage = action.payload;
            calculateEstimate(state);
        },
        setHasProps: (state, action: PayloadAction<boolean>) => {
            state.hasProps = action.payload;
            calculateEstimate(state);
        },
        setLicenseType: (state, action: PayloadAction<'personal' | 'commercial' | 'print'>) => {
            state.licenseType = action.payload;
            calculateEstimate(state);
        },
        setIsPrivate: (state, action: PayloadAction<boolean>) => {
            state.isPrivate = action.payload;
            calculateEstimate(state);
        },
        setDiscountCount: (state, action: PayloadAction<number>) => {
            if (action.payload <= state.charCount) {
                state.discountCount = action.payload;
                calculateEstimate(state);
            }
        },
        resetEstimate: () => initialState,
    },
});

export const {
    setColorType,
    setCharCount,
    setCoverage,
    setHasProps,
    setLicenseType,
    setIsPrivate,
    setDiscountCount,
    resetEstimate,
} = infoSlice.actions;
export default infoSlice.reducer;
