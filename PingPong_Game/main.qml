import QtQuick.Window 2.12
import QtQuick 2.12
import QtQuick.Controls.Material 2.0
import QtQuick.Controls 2.3


Window {
    visible: true
    width: 600
    height: 300
    title: qsTr("Ping Pong")
    color: "#023d09"

    Component.onCompleted: pageLoader.source = "menu.qml"

    Loader {
        id: pageLoader
        anchors.fill: parent
    }
}
