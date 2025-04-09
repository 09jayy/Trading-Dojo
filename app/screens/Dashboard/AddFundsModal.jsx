import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import { modalStyles, PLACEHOLDER_COLOUR } from "./ModalStyles";

const AddFundsModal = ({ visible, onClose, onConfirm }) => 
{
    const [amount, setAmount] = useState("");

    const handleConfirm = () => 
    {
        const parsed = parseFloat(amount);
        if (!isNaN(parsed) && parsed > 0) {
            onConfirm(parsed);
            setAmount("");
        } else {
            alert("Please enter a valid amount.");
        }
    };

    return (
        <Modal transparent visible={visible} animationType="slide">
            <View style={modalStyles.overlay}>
                <View style={modalStyles.modalContainer}>
                    <Text style={modalStyles.title}>Add Funds</Text>
                    <TextInput
                        style={modalStyles.input}
                        placeholder="Enter amount"
                        placeholderTextColor={PLACEHOLDER_COLOUR}
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                    />
                    <TouchableOpacity style={modalStyles.button} onPress={handleConfirm}>
                        <Text style={modalStyles.buttonText}>Confirm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={modalStyles.closeButton} onPress={onClose}>
                        <Text style={modalStyles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
        );
    };
    export default AddFundsModal;
