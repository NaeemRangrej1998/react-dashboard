import React, { useRef, useEffect } from "react";
import { LuX } from 'react-icons/lu';
export default function CommonModal({ isOpen, onClose, type='danger',
    size='md',title ,content,confirmText = 'Delete',cancelText = 'Cancel',onConfirm}) {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the clicked target is the modal overlay
            if (modalRef.current && event.target === modalRef.current) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const getTypeStyles = () => {
        switch (type) {
            case 'danger':
                return {
                    button: 'bg-red-600 hover:bg-red-700',
                    icon: 'text-red-500'
                };
            case 'warning':
                return {
                    button: 'bg-yellow-600 hover:bg-yellow-700',
                    icon: 'text-yellow-500'
                };
            case 'info':
                return {
                    button: 'bg-primary-500 hover:bg-primary-700 ',
                    icon: 'text-primary'
                };
            default:
                return {
                    button: 'bg-red-600 hover:bg-red-700',
                    icon: 'text-red-500'
                };
        }
    };

    const getSizeStyles = () => {
        switch (size) {
            case 'sm':
                return 'max-w-sm';
            case 'lg':
                return 'max-w-2xl';
            case 'xl':
                return 'max-w-3xl';
            default:
                return 'max-w-md';
        }
    };

    const styles = getTypeStyles();
    const sizeClass = getSizeStyles();

    return (
        <>
            <div className="fixed inset-0 !mt-0 z-50 flex items-center justify-center bg-stone-950/50 ">
                <div ref={modalRef}  className={`bg-white rounded-xl shadow-xl w-full  ${sizeClass} `}>
                    <div className="flex justify-between items-center p-4 border-b border-gray-200 rounded-t">
                        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            <LuX  className="text-2xl"/>
                        </button>
                    </div>
                    <div className="px-4 pb-0 max-h-72 overflow-y-auto">
                        {content}
                    </div>
                    <div className="flex justify-end gap-2 p-4 border-t border-gray-200 rounded-b">
                        <button onClick={onClose} className="border border-gray-300 text-secondary bg-white hover:bg-secondary transition-colors ease-in-out px-3 py-1 rounded flex items-center gap-2">
                            Cancle
                        </button>
                        <button className="border border-gray-300 text-secondary bg-white hover:bg-secondary  transition-colors ease-in-out px-3 py-1 rounded flex items-center gap-2">
                            Okay
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}