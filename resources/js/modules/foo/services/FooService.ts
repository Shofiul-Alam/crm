import { defineStore, Store } from 'pinia';
import {PiniaGetterAdaptor, PiniaActionAdaptor} from '@/share/types'

/* Defining our store types */

type State = {
    someNumber: number;
};

type Getters = {
    someNumberPlusOne: number;
    someNumberPlusOneTimesTwo: number;
};

type Actions = {
    setSomeNumber: (newNumber: number) => Promise<void>;
    wrappedSetSomeNumber: (newNumber: number) => Promise<void>;
};

type SomeNumberStore = Store<'someNumber', State, Getters, Actions>;

/* Now defining the store one element at a time */

const getters: PiniaGetterAdaptor<Getters, SomeNumberStore> = {
    someNumberPlusOne(state) {
        return state.someNumber + 1;
    },
    someNumberPlusOneTimesTwo() {
        return this.someNumberPlusOne * 2;
    },
};

const actions: PiniaActionAdaptor<Actions, SomeNumberStore> = {
    async setSomeNumber(newNumber: number) {
        this.someNumber = newNumber;
    },
    async wrappedSetSomeNumber(newNumber: number) {
        this.setSomeNumber(newNumber);
    },
};

export default defineStore('someNumber', {
    state: getState,
    getters,
    actions,
});

function getState(): State {
    return {
        someNumber: 12,
    };
}

