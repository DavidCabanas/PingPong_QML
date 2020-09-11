import QtQuick 2.0
import QtQuick.Controls 2.3

Rectangle {
    id: rectangle
    color: "#023d09"

    gradient: Gradient {
        GradientStop {
            position: 0.379
            color: "#023d09"
        }

        GradientStop {
            position: 1
            color: "#000000"
        }
    }

    Rectangle {
        id: titlebox
        y: 55
        height: 91
        anchors.horizontalCenter: parent
        color: "#690505"
        radius: 10
        anchors.right: parent.right
        anchors.rightMargin: 190
        anchors.left: parent.left
        anchors.leftMargin: 190
        clip: false
        border.width: 2
        Text {
            id: title
            horizontalAlignment: Text.AlignHCenter
            verticalAlignment: Text.AlignVCenter
            anchors.fill: parent
            font.pointSize: 20
            width: 300
            height: 100
            text: qsTr("Ping Pong Game")
            color: "#000000"
            anchors.rightMargin: 48
            anchors.bottomMargin: 1
            anchors.leftMargin: 48
            anchors.topMargin: 0

        }
    }

    Button {
        id: startbutton
        y: 310
        text: qsTr("Start")
        anchors.bottom: parent.bottom
        anchors.bottomMargin: 130
        anchors.left: parent.left
        anchors.leftMargin: 64
        onClicked:  {
            pageLoader.source = "board.qml";
        }


    }

    Button {
        id: closebutton
        x: 476
        y: 310
        text: qsTr("Close")
        anchors.bottom: parent.bottom
        anchors.bottomMargin: 130
        anchors.right: parent.right
        anchors.rightMargin: 64
        onClicked: {

        }
    }



}
