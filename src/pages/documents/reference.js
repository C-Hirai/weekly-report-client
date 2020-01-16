import { Button, FormControl, Table } from "react-bootstrap";
import useForm from "react-hook-form/dist/react-hook-form";
import Router from "next/router";
import styled from "styled-components";
import BackToTopButton from "src/components/BackToTopButton";
import Layout from "src/components/Layout";
import projectList from "src/constants/ProjectList";

const FlexForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const SubmitButtonContainer = styled.div`
  align-self: flex-end;
  margin-top: 10px;
  margin-right: 10px;
`;

function Reference({ date }) {
  const { register, handleSubmit } = useForm();

  const edit = e => {
    const id = e.target.id;
    Router.push(`/documents/edit?id=${id}&date=${date}`);
  };

  const save = async data => {
    projectList.map(({ basicInfo, weeklyInfo }) => {
      const memo = data[String(basicInfo.id)];
      weeklyInfo.memo = memo;
    });
  };

  return (
    <Layout>
      <h2>{date}の週次進捗会</h2>
      <FlexForm onSubmit={handleSubmit(save)}>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>案件</th>
              <th>リリース期限</th>
              <th>担当役席</th>
              <th>メンバー</th>
              <th>進捗状況</th>
              <th>今週の予定</th>
              <th>今週の実績</th>
              <th>課題</th>
              <th>来週の予定</th>
              <th>議事メモ</th>
              <th>編集</th>
            </tr>
          </thead>
          {projectList.map(({ basicInfo, weeklyInfo }) => (
            <tbody key={basicInfo.id}>
              <tr>
                <td>{basicInfo.name}</td>
                <td>{basicInfo.deadline}</td>
                <td>{basicInfo.leader}</td>
                <td>{basicInfo.member}</td>
                <td>{weeklyInfo.condition}</td>
                <td>{weeklyInfo.thisWeekPlan}</td>
                <td>{weeklyInfo.thisWeekResult}</td>
                <td>{weeklyInfo.problem}</td>
                <td>{weeklyInfo.nextWeekPlan}</td>
                <td>
                  <FormControl
                    componentClass='textarea'
                    id={String(basicInfo.id)}
                    name={String(basicInfo.id)}
                    defaultValue={weeklyInfo.memo}
                    inputRef={register}
                  />
                </td>
                <td>
                  <Button
                    bsStyle='link'
                    id={weeklyInfo.id}
                    value={date}
                    onClick={edit}
                  >
                    編集
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
        <SubmitButtonContainer>
          <Button bsStyle='primary' type='submit'>
            保存
          </Button>
        </SubmitButtonContainer>
        <BackToTopButton />
      </FlexForm>
    </Layout>
  );
}

Reference.getInitialProps = ({ query }) => ({ date: query.date });

export default Reference;
