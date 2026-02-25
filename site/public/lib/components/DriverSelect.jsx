import React, { useState, useEffect, useRef } from 'react';
import * as Select from '@radix-ui/react-select';
import { ChevronDown, Check } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function DriverSelect({ id, drivers, initialValue, onChange }) {
    const [value, setValue] = useState(initialValue);
    const hiddenSelectRef = useRef(null);

    const handleValueChange = (newValue) => {
        setValue(newValue);
        const hiddenSelect = document.getElementById(id);
        if (hiddenSelect) {
            hiddenSelect.value = newValue;
            // Fire native change event so compare.js vanilla listeners trigger
            const event = new Event('change', { bubbles: true });
            hiddenSelect.dispatchEvent(event);
        }
        if (onChange) onChange(newValue);
    };

    // Sync back if external vanilla JS changes it (like Swap drivers)
    useEffect(() => {
        const hiddenSelect = document.getElementById(id);
        if (!hiddenSelect) return;

        // Polling is 100% safe from React 19's strictly guarded DOM nodes 
        // and correctly catches programmatic .value assignments from compare.js
        const intervalId = setInterval(() => {
            if (hiddenSelect.value && hiddenSelect.value !== value) {
                setValue(hiddenSelect.value);
            }
        }, 100);

        return () => clearInterval(intervalId);
    }, [id, value]);

    return (
        <div className="islands-root">
            <Select.Root value={value} onValueChange={handleValueChange}>
                <Select.Trigger
                    className="inline-flex items-center justify-between rounded-md px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-[var(--surface-bg)] text-white shadow-[0_2px_10px] shadow-black/10 hover:bg-white/5 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-white/50 outline-none border border-white/10 min-w-[200px]"
                    aria-label="Driver"
                >
                    <Select.Value placeholder="Select a driver" />
                    <Select.Icon className="text-white/50">
                        <ChevronDown size={16} />
                    </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                    <Select.Content
                        className="overflow-hidden bg-[rgba(15,17,21,0.95)] backdrop-blur-md rounded-md border border-white/10 shadow-[0px_10px_38px_-10px_rgba(22,23,24,0.35),0px_10px_20px_-15px_rgba(22,23,24,0.2)] z-[100]"
                    >
                        <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-[var(--surface-bg)] text-white cursor-default">
                            <ChevronDown size={16} className="rotate-180" />
                        </Select.ScrollUpButton>
                        <Select.Viewport className="p-[5px]">
                            {drivers.map((d) => (
                                <Select.Item
                                    key={d.code}
                                    value={d.code.toLowerCase()}
                                    className="text-[13px] leading-none text-white/80 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-white/30 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-white/10 data-[highlighted]:text-white"
                                >
                                    <Select.ItemText>{d.name} ({d.team})</Select.ItemText>
                                    <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                                        <Check size={14} className="text-[var(--f1-red)]" />
                                    </Select.ItemIndicator>
                                </Select.Item>
                            ))}
                        </Select.Viewport>
                        <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-[var(--surface-bg)] text-white cursor-default">
                            <ChevronDown size={16} />
                        </Select.ScrollDownButton>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>

        </div>
    );
}
