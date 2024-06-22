import { k } from "../kaplayLoader";

export function makePlayer(){
    return k.make([
        k.pos(), 
        k.sprite("player"), k.area({
         shape: new k.Rect(k.vec2(0,18), 12,12)   
        }),
        k.anchor("center"),
        k.body({ 
            mass: 100, 
            jumpForce: 320
        }),
        k.doubleJump(state.current().isDoubleJumpUnlocked ? 2 : 1), 
        k.opacity(), 
        k.health(state.current().playerHp),
        "player",
        {
            speed: 150, 
            isAttacking: false, 
            setControls(){ // 
                this.controlHandlers = [];
                

                this.controlHandlers.push(k.keyPress( (key) => {
                    if(key === "x"){
                        if(this.curAnim() !== "jump") this.play("jump");
                        this.doubleJump();
                    }

                    if(key === "z" && this.currAnim() !== "attack" && this.isGrounded()){
                        this.isAttacking = true;
                        this.add([ 
                            k.pos(this.flipX ? -25 : 0, 10), k.area({ 
                                shape: new k.Rect(k.vec2(0), 25, 10)
                            }), 
                            "sword-hitbox"
                        ]);
                        this.play("attack");

                        this.onAnimEnd((anim) => { 
                            if (anim === "attack"){
                                const swordHitbox = k.get("sword-hitbox", 
                                    {
                                        recursive: true
                                    }
                                )[0];


                                if(swordHitbox){
                                    k.destroy(swordHitbox);
                                    this.isAttacking = false;
                                    this.play("idle");
                                }

                            }
                        })

                    }

                }));


                this.controlHandlers.push(k.keyPress( (key) => {

                    if(key === "left" && !this.isAttacking){
                        if(this.curAnim() !== "run" && this.isGrounded()){
                            this.play("run");


                        }
                        this.flipX = false;

                        this.move(-this.speed, 0);
                        return;
                    }

                    if(key === "right" && !this.isAttacking){
                        if(this.curAnim() !== "run" && this.isGrounded()){
                            this.play("run");


                        }
                        this.flipX = false;

                        this.move(this.speed, 0);
                        return;
                    }

                }));


                
            }
        }
    ]);
}