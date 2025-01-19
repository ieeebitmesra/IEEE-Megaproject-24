#The following code will not be used in the frontent

from pyteal import *
from pyteal import Bytes, Txn
from pyteal.ast import App

def approval_program():
    # Define the survey creation and response submission logic
    on_creation = Seq([
        App.globalPut(Bytes("Creator"), Txn.sender()),
        App.globalPut(Bytes("Question"), Txn.application_args[0]),
        App.globalPut(Bytes("Option1"), Txn.application_args[1]),
        App.globalPut(Bytes("Option2"), Txn.application_args[2]),
        App.globalPut(Bytes("Response1"), Int(0)),
        App.globalPut(Bytes("Response2"), Int(0)),
        Return(Int(1))
    ])

    is_creator = Txn.sender() == App.globalGet(Bytes("Creator"))

    on_vote = Seq([
        Assert(Txn.application_args.length() == Int(2)),
        Assert(Or(
            Txn.application_args[1] == Bytes("1"),
            Txn.application_args[1] == Bytes("2")
        )),
        If(Txn.application_args[1] == Bytes("1"),
            App.globalPut(Bytes("Response1"), App.globalGet(Bytes("Response1")) + Int(1)),
            App.globalPut(Bytes("Response2"), App.globalGet(Bytes("Response2")) + Int(1))
        ),
        Return(Int(1))
    ])

    program = Cond(
        [Txn.application_id() == Int(0), on_creation],
        [Txn.on_completion() == OnComplete.NoOp, on_vote]
    )

    return program

def clear_state_program():
    return Return(Int(1))

if __name__ == "__main__":
    approval = approval_program()
    clear = clear_state_program()

    compiled_approval = compileTeal(approval, mode=Mode.Application, version=4)
    compiled_clear = compileTeal(clear, mode=Mode.Application, version=2)

    with open("approval.teal", "w") as f:
        f.write(compiled_approval)

    with open("clear.teal", "w") as f:
        f.write(compiled_clear)