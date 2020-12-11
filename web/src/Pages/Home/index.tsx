import React from 'react';
import HeaderBar from '../../Components/HeaderBar';
import QuestionCard from '../../Components/QuestionCard';

const Home = () => {
    return (
        <>
            <HeaderBar />
            <div className="homeConatiner">
                <QuestionCard
                    userName="Fulano de tal"
                    subject="Matemática"
                    questionName="A soma do quadrado dos catetos de um triângulo é igual à..."
                    questionDetail="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    stars={10}
                    comments={77}
                    tags={["Trigonometria", "Música"]}
                />
                <QuestionCard
                    userName="Outro Fulano"
                    subject="Ciências"
                    questionName="Qual a principal parte do Corpo Humamo?"
                    questionDetail="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    stars={7}
                    comments={12}
                    tags={["Biologia", "CorpoHumano"]}
                />
                <QuestionCard
                    userName="Mais um Fulano"
                    subject="História"
                    questionName="Quem descobriu o Brasil?"
                    questionDetail="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    stars={132}
                    comments={56}
                    tags={["HistoriaBrasil", "1500"]}
                />
            </div>
        </>
    );
}

export default Home;
