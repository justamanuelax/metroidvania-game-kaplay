
export const StatePropsEnum = {
    playerHp: "playerHP", 
    isDoubleJumpUnlocked: "isDoubleJumpUnlocked",
    playerInBossFight: "playerInBossFight",
    isBossDefeated: "isBossDefeated"
}

function initStateManager() {

    const state = {
        playerHp: 3, 
        maxPLayerHP: 3,
        isDoubleJumpUnlocked: false, 
        playerInBossFight: false, 
        isBossDefeated: false
    };

    return {
        current(){ 
            return { ...state };
        },
        set(property, value){
            state[property] = value;
        }

    }
}

export const state = initStateManager();
