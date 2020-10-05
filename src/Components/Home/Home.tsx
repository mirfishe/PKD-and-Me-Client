import React, {Component} from "react";

interface IProps {
    isLoggedIn: boolean | undefined,
    isAdmin: boolean | undefined,
    sessionToken: string
};

interface IState {

};

class Home extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {

        };

    };


    render() {

        return(
            <div>
                <h1>Philip K. Dick and Me</h1>
          </div>
        );
    };
};

export default Home;